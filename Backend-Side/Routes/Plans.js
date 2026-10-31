import express from "express";
import mongoose from "mongoose";
import Plan from "../models/Plan.js";
import { generatePlan } from "../Gemini.js";

const router = express.Router();

// Frontend ki lists se bilkul same honi chahiye
const LIVING_SITUATIONS = ["Ghar par akela", "Parivaar ke saath", "Hospital me admit", "Surgery ke baad recovery", "Hostel / PG", "Other"];
const CONDITIONS = ["Diabetes", "BP / Hypertension", "Heart disease", "Asthma / COPD", "Kidney disease", "Epilepsy (mirgi)", "Stroke recovery", "Cancer treatment", "Pregnancy", "Post-surgery recovery"];
const EMERGENCY_RISKS = ["Seene me dard / heart attack", "Saans phoolna", "Sugar bahut low / high", "BP bahut high / low", "Daura (seizure)", "Girna / chot lagna", "Allergy reaction", "Zyada bleeding", "Dawai chhoot jaana / galat dawai"];
const CARE_NEEDS = ["Chal-phir nahi sakte", "Wheelchair / walker use karte hain", "Kam dikhai deta hai", "Kam sunai deta hai", "Yaaddasht kamzor hai", "Dusron par nirbhar"];
const RESOURCES = ["Dawai ka stock", "BP machine", "Glucometer", "Oxygen cylinder / concentrator", "Nebulizer", "Caretaker / nurse", "Emergency contact list", "Ambulance access", "Nazdiki hospital paas me", "Health insurance", "Medical reports ek jagah"];

const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const onlyAllowed = (v, allowed) =>
  Array.isArray(v) ? [...new Set(v.filter((x) => allowed.includes(x)))] : [];
const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id) ? next() : res.status(400).json({ error: "Galat id" });

// Simple rate limit: free Gemini quota bachane ke liye (har IP se 10 plan / minute)
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const recent = (hits.get(req.ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 10) {
    return res.status(429).json({ error: "Bahut zyada requests. Ek minute baad try karo." });
  }
  recent.push(now);
  hits.set(req.ip, recent);
  next();
}

// TODO: login ke baad yahan auth middleware lagao aur Plan mein owner (patientId) save karo.
// Ye medical data hai, warna koi bhi dusre ke plans dekh ya delete kar sakta hai.

// 1) Naya plan banao (AI) aur save karo
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

    if (!input.name) return res.status(400).json({ error: "Patient ka naam likho." });
    if (!Number.isInteger(input.age) || input.age < 0 || input.age > 120) {
      return res.status(400).json({ error: "Umar 0 se 120 ke beech honi chahiye." });
    }
    if (!input.livingSituation) {
      return res.status(400).json({ error: "Patient kahan rehta hai, ye chuno." });
    }
    if (input.conditions.length === 0 && input.emergencyRisks.length === 0) {
      return res.status(400).json({ error: "Kam se kam ek bimari ya emergency risk chuno." });
    }

    const { plan, fallback } = await generatePlan(input);

    const doc = await Plan.create({
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
    res.status(500).json({ error: "Plan nahi ban paya" });
  }
});

// 2) Saved plans ki list
router.get("/", async (req, res) => {
  try {
    const list = await Plan.find({ patient: { $exists: true } }) // purane community plans skip
      .sort({ createdAt: -1 })
      .limit(50)
      .select("patient conditions emergencyRisks fallback createdAt")
      .lean();
    res.json(list);
  } catch (err) {
    console.error("GET /plans:", err);
    res.status(500).json({ error: "Plans load nahi ho paye" });
  }
});

// 3) Ek plan poora
router.get("/:id", validId, async (req, res) => {
  try {
    const doc = await Plan.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Plan nahi mila" });
    res.json(doc);
  } catch (err) {
    console.error("GET /plans/:id:", err);
    res.status(500).json({ error: "Plan load nahi ho paya" });
  }
});

// 4) Checklist progress save karo: body = { done: ["0-1", "2-3"] }
router.patch("/:id/progress", validId, async (req, res) => {
  try {
    const raw = req.body?.done;
    const done = Array.isArray(raw)
      ? [...new Set(raw.filter((x) => typeof x === "string" && x.length <= 12))].slice(0, 200)
      : null;
    if (!done) return res.status(400).json({ error: "done array chahiye" });

    const doc = await Plan.findByIdAndUpdate(req.params.id, { done }, { new: true }).select("done");
    if (!doc) return res.status(404).json({ error: "Plan nahi mila" });
    res.json({ done: doc.done });
  } catch (err) {
    console.error("PATCH /plans/:id/progress:", err);
    res.status(500).json({ error: "Progress save nahi hua" });
  }
});

// 5) Plan delete
router.delete("/:id", validId, async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /plans/:id:", err);
    res.status(500).json({ error: "Delete nahi ho paya" });
  }
});

export default router;
