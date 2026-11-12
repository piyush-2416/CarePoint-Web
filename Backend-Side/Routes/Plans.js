import express from "express";
import mongoose from "mongoose";
import Plan from "../models/Plan.js";
import { generatePlan } from "../Gemini.js";

const router = express.Router();

// Must be exactly the same as the lists in the frontend (SafetyPlanner.jsx)
const LIVING_SITUATIONS = ["Living alone at home", "With family", "Admitted in hospital", "Recovering after surgery", "Hostel / PG", "Other"];
const CONDITIONS = ["Diabetes", "BP / Hypertension", "Heart disease", "Asthma / COPD", "Kidney disease", "Epilepsy (seizures)", "Stroke recovery", "Cancer treatment", "Pregnancy", "Post-surgery recovery"];
const EMERGENCY_RISKS = ["Chest pain / heart attack", "Shortness of breath", "Very low / high sugar", "Very high / low BP", "Seizure", "Fall / injury", "Allergic reaction", "Heavy bleeding", "Missed / wrong medicine"];
const CARE_NEEDS = ["Cannot walk around", "Uses wheelchair / walker", "Poor eyesight", "Poor hearing", "Weak memory", "Dependent on others"];
const RESOURCES = ["Medicine stock", "BP machine", "Glucometer", "Oxygen cylinder / concentrator", "Nebulizer", "Caretaker / nurse", "Emergency contact list", "Ambulance access", "Hospital nearby", "Health insurance", "Medical reports in one place"];

const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const onlyAllowed = (v, allowed) =>
  Array.isArray(v) ? [...new Set(v.filter((x) => allowed.includes(x)))] : [];
const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id) ? next() : res.status(400).json({ error: "Invalid id" });

// Logged-in user's id (works for both patient and doctor)
const getUserId = (req) =>
  String(req.user?.id ?? req.user?._id ?? req.user?.userId ?? req.userId ?? "");

// Do not continue if the user id is missing
const needUser = (req, res, next) =>
  getUserId(req) ? next() : res.status(401).json({ error: "Please log in first" });

router.use(needUser);

// Simple rate limit to save the free Gemini quota (10 plans / minute per IP)
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const recent = (hits.get(req.ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 10) {
    return res.status(429).json({ error: "Too many requests. Please try again in a minute." });
  }
  recent.push(now);
  hits.set(req.ip, recent);
  next();
}

// 1) Create a new plan (AI) and save it
router.post("/generate", rateLimit, async (req, res) => {
  try {
    const b = req.body || {};
    const input = {
      name: clean(b.name, 80),
      age: Number(b.age),
      livingSituation: LIVING_SITUATIONS.includes(b.livingSituation) ? b.livingSituation : null,
      location: clean(b.location, 100),
      notes: clean(b.notes, 300),
      conditions: onlyAllowed(b.conditions, CONDITIONS),
      emergencyRisks: onlyAllowed(b.emergencyRisks, EMERGENCY_RISKS),
      careNeeds: onlyAllowed(b.careNeeds, CARE_NEEDS),
      resources: onlyAllowed(b.resources, RESOURCES),
    };

    if (!input.name) return res.status(400).json({ error: "Please enter the patient's name." });
    if (!Number.isInteger(input.age) || input.age < 0 || input.age > 120) {
      return res.status(400).json({ error: "Age must be between 0 and 120." });
    }
    if (!input.livingSituation) {
      return res.status(400).json({ error: "Please choose where the patient lives." });
    }
    if (input.conditions.length === 0 && input.emergencyRisks.length === 0) {
      return res.status(400).json({ error: "Select at least one condition or emergency risk." });
    }

    const { plan, fallback } = await generatePlan(input);

    const doc = await Plan.create({
      owner: getUserId(req),
      patient: {
        name: input.name,
        age: input.age,
        livingSituation: input.livingSituation,
        location: input.location,
      },
      conditions: input.conditions,
      emergencyRisks: input.emergencyRisks,
      careNeeds: input.careNeeds,
      resources: input.resources,
      notes: input.notes,
      plan,
      fallback,
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error("POST /plans/generate:", err);
    res.status(500).json({ error: "Could not create the plan" });
  }
});

// 2) List of your saved plans
router.get("/", async (req, res) => {
  try {
    const list = await Plan.find({ owner: getUserId(req), patient: { $exists: true } })
      .sort({ createdAt: -1 })
      .limit(50)
      .select("patient conditions emergencyRisks fallback createdAt")
      .lean();
    res.json(list);
  } catch (err) {
    console.error("GET /plans:", err);
    res.status(500).json({ error: "Could not load plans" });
  }
});

// 3) One full plan (owner only)
router.get("/:id", validId, async (req, res) => {
  try {
    const doc = await Plan.findOne({ _id: req.params.id, owner: getUserId(req) });
    if (!doc) return res.status(404).json({ error: "Plan not found" });
    res.json(doc);
  } catch (err) {
    console.error("GET /plans/:id:", err);
    res.status(500).json({ error: "Could not load the plan" });
  }
});

// 4) Save checklist progress: body = { done: ["0-1", "2-3"] }
router.patch("/:id/progress", validId, async (req, res) => {
  try {
    const raw = req.body?.done;
    const done = Array.isArray(raw)
      ? [...new Set(raw.filter((x) => typeof x === "string" && x.length <= 12))].slice(0, 200)
      : null;
    if (!done) return res.status(400).json({ error: "A 'done' array is required" });

    const doc = await Plan.findOneAndUpdate(
      { _id: req.params.id, owner: getUserId(req) },
      { done },
      { new: true }
    ).select("done");
    if (!doc) return res.status(404).json({ error: "Plan not found" });
    res.json({ done: doc.done });
  } catch (err) {
    console.error("PATCH /plans/:id/progress:", err);
    res.status(500).json({ error: "Could not save progress" });
  }
});

// 5) Delete a plan (owner only)
router.delete("/:id", validId, async (req, res) => {
  try {
    const doc = await Plan.findOneAndDelete({ _id: req.params.id, owner: getUserId(req) });
    if (!doc) return res.status(404).json({ error: "Plan not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /plans/:id:", err);
    res.status(500).json({ error: "Could not delete the plan" });
  }
});

export default router;
