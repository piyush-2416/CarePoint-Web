import express from "express";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { fileURLToPath } from "url";
import User from "../models/User.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
const DOCUMENTS_COLLECTION = "Documents-data";
const RELATIVES_COLLECTION = "Relatives-data";
const PATIENT_ROLES = ["patient", "user"]; // "user" = purane accounts

const router = express.Router();
const getDb = (req) => req.app.locals.db;

async function findPatient(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  return User.findOne({ _id: id, role: { $in: PATIENT_ROLES } }).select("name email createdAt");
}

// GET /api/patients  -> saare patients
router.get("/", async (req, res) => {
  try {
    const patients = await User.find({ role: { $in: PATIENT_ROLES } })
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .limit(500);

    res.json(
      patients.map((p) => ({ id: p._id, name: p.name, email: p.email, createdAt: p.createdAt }))
    );
  } catch (err) {
    console.error("❌ Patients load error:", err.message);
    res.status(500).json({ message: "Patients load nahi ho paaye" });
  }
});

// GET /api/patients/:id  -> patient + emergency contacts (relatives) + documents
router.get("/:id", async (req, res) => {
  try {
    const patient = await findPatient(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient nahi mila" });

    const uid = String(patient._id);
    const db = getDb(req);

    const [relatives, documents] = await Promise.all([
      db.collection(RELATIVES_COLLECTION).find({ userId: uid }).sort({ createdAt: -1 }).toArray(),
      db
        .collection(DOCUMENTS_COLLECTION)
        .find({ userId: uid })
        .project({ storedName: 0 }) // server ka file path bahar mat bhejo
        .sort({ createdAt: -1 })
        .toArray(),
    ]);

    res.json({
      patient: { id: patient._id, name: patient.name, email: patient.email, createdAt: patient.createdAt },
      relatives,
      documents,
    });
  } catch (err) {
    console.error("❌ Patient detail error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/patients/:id/documents/:docId/file  -> patient ka document dekho
router.get("/:id/documents/:docId/file", async (req, res) => {
  try {
    const { id, docId } = req.params;
    if (!ObjectId.isValid(docId)) return res.status(400).json({ message: "Invalid document id" });

    const patient = await findPatient(id);
    if (!patient) return res.status(404).json({ message: "Patient nahi mila" });

    const doc = await getDb(req)
      .collection(DOCUMENTS_COLLECTION)
      .findOne({ _id: new ObjectId(docId), userId: String(patient._id) });
    if (!doc) return res.status(404).json({ message: "Document nahi mila" });

    const filePath = path.join(UPLOAD_DIR, path.basename(doc.storedName));
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File server par nahi mili" });

    res.setHeader("X-Content-Type-Options", "nosniff");
    res.type(doc.mimeType);
    res.sendFile(filePath);
  } catch (err) {
    console.error("❌ Patient document error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
