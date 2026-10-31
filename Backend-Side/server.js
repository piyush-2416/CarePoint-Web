import "dotenv/config"; // .env sabse pehle load ho (Gemini.js / Safetyai.js se pehle)
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";
import doctorProfileRouter from "./Routes/DoctorProfile.js";
// NOTE: folder ka naam exactly "Routes" / "Middleware" hona chahiye (Linux/Render par case-sensitive hota hai)
import authRouter from "./Routes/Auth.js";
import plansRouter from "./Routes/Plans.js";
import safetyRouter from "./Routes/Safety.js";
import { requireAuth, requireRole } from "./Middleware/auth.js";
import patientsRouter from "./Routes/Patients.js";
// ---------- Config ----------
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DB_NAME || "hospital-data";
const SAFETY_DB_NAME = process.env.SAFETY_DB_NAME || DATABASE_NAME;
const DOCTORS_COLLECTION = "Doctors-data";
const MEDICINES_COLLECTION = "Medicine-data";
const DOCUMENTS_COLLECTION = "Documents-data";
const RELATIVES_COLLECTION = "Relatives-data";
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---------- .env checks ----------
if (!/^mongodb(\+srv)?:\/\//.test(MONGODB_URI ?? "")) {
  console.error(
    "❌ MONGODB_URI galat ya khali hai. .env Server.js ke folder mein hai? Format: MONGODB_URI=mongodb+srv://..."
  );
  console.error("📁 Current folder:", process.cwd());
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY .env me nahi mila: AI features sirf fallback jawab denge.");
}

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error("❌ .env mein JWT_SECRET (kam se kam 32 characters) daalo.");
  process.exit(1);
}
if (!process.env.DOCTOR_INVITE_CODE) {
  console.warn("⚠️ DOCTOR_INVITE_CODE .env me nahi mila: doctor signup band rahega.");
}

// ---------- App setup ----------
const app = express(); // sirf EK baar
app.set("trust proxy", 1); // Render jaise hosting par rate limit aur secure cookie ke liye

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // cookie bhejne ke liye zaroori
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" })); // sirf EK baar

// ---------- Helpers ----------
const getUserId = (req) =>
  String(req.user?.id ?? req.user?._id ?? req.user?.userId ?? req.userId ?? "");

const getDb = (req) => req.app.locals.db;

// Doctor ko id se dhundo (ObjectId, string _id ya custom id, teeno chalenge)
async function findDoctorById(db, id) {
  const col = db.collection(DOCTORS_COLLECTION);

  if (ObjectId.isValid(id)) {
    const doc = await col.findOne({ _id: new ObjectId(id) });
    if (doc) return doc;
  }

  const byStringId = await col.findOne({ _id: id });
  if (byStringId) return byStringId;

  const asNumber = Number(id);
  return col.findOne({
    $or: [{ id }, ...(Number.isNaN(asNumber) ? [] : [{ id: asNumber }])],
  });
}

// ---------- Health check ----------
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Server chal raha hai 🚀", port: PORT });
});

// ---------- Auth (public: signup / login / logout / me) ----------
app.use("/api/auth", authRouter);

// ---------- Doctors (public) ----------
// Frontend /api/products use karta hai, isliye dono URL chalte hain:
//   /api/products  (Doctors.jsx + detail page)
//   /api/doctors   (naya naam)
app.get(["/api/products", "/api/doctors"], async (req, res) => {
  try {
    const doctors = await getDb(req)
      .collection(DOCTORS_COLLECTION)
      .find({ isProfileComplete: { $ne: false } })
      .toArray();
    res.json(doctors);
  } catch (err) {
    console.error("❌ Doctors load error:", err.message);
    res.status(500).json({ error: "Doctors load nahi ho paaye" });
  }
});

// Ek doctor ki detail (id ya _id se)
app.get(["/api/products/:id", "/api/doctors/:id", "/api/Doctorid/:id"], async (req, res) => {
  try {
  const doctor = await findDoctorById(getDb(req), req.params.id);
if (!doctor || doctor.isProfileComplete === false) {
  return res.status(404).json({ error: "Doctor nahi mila" });
}
res.json(doctor);
  } catch (err) {
    console.error("❌ Doctor error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------- Medicines (public) ----------
app.get("/api/medicines", async (req, res) => {
  try {
    const medicines = await getDb(req).collection(MEDICINES_COLLECTION).find({}).toArray();
    res.json(medicines);
  } catch (err) {
    console.error("❌ Medicines load error:", err.message);
    res.status(500).json({ error: "Medicines load nahi ho paaye" });
  }
});

// ---------- Documents (login zaroori) ----------
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Sirf PDF, JPG, PNG ya WEBP file allowed hai"));
  },
});

const documentsRouter = express.Router();

// Apne saare documents
documentsRouter.get("/", async (req, res) => {
  try {
    const docs = await getDb(req)
      .collection(DOCUMENTS_COLLECTION)
      .find({ userId: getUserId(req) })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(docs);
  } catch (err) {
    console.error("❌ Documents load error:", err.message);
    res.status(500).json({ error: "Documents load nahi ho paaye" });
  }
});

// Upload (form-data me field ka naam: "file", optional: "title")
documentsRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File select karo" });

    const doc = {
      userId: getUserId(req),
      title: (req.body.title || req.file.originalname).toString().slice(0, 150),
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      createdAt: new Date(),
    };

    const result = await getDb(req).collection(DOCUMENTS_COLLECTION).insertOne(doc);
    res.status(201).json({ ...doc, _id: result.insertedId });
  } catch (err) {
    console.error("❌ Document upload error:", err.message);
    res.status(500).json({ error: "Document upload nahi ho paaya" });
  }
});

// File dekhna / download (sirf owner ko)
documentsRouter.get("/:id/file", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid document id" });
    }
    const doc = await getDb(req)
      .collection(DOCUMENTS_COLLECTION)
      .findOne({ _id: new ObjectId(req.params.id), userId: getUserId(req) });
    if (!doc) return res.status(404).json({ error: "Document nahi mila" });

    const filePath = path.join(UPLOAD_DIR, path.basename(doc.storedName));
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File server par nahi mili" });
    }
    res.type(doc.mimeType);
    res.sendFile(filePath);
  } catch (err) {
    console.error("❌ Document file error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete
documentsRouter.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid document id" });
    }
    const col = getDb(req).collection(DOCUMENTS_COLLECTION);
    const doc = await col.findOne({ _id: new ObjectId(req.params.id), userId: getUserId(req) });
    if (!doc) return res.status(404).json({ error: "Document nahi mila" });

    await col.deleteOne({ _id: doc._id });
    fs.unlink(path.join(UPLOAD_DIR, path.basename(doc.storedName)), () => {}); // file bhi hatao
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Document delete error:", err.message);
    res.status(500).json({ error: "Document delete nahi ho paaya" });
  }
});

// ---------- Relatives (login zaroori) ----------
const RELATIVE_FIELDS = ["name", "relation", "phone", "email", "address", "age", "bloodGroup", "notes"];

const pickRelativeFields = (body) =>
  Object.fromEntries(RELATIVE_FIELDS.filter((k) => body[k] !== undefined).map((k) => [k, body[k]]));

const relativesRouter = express.Router();

relativesRouter.get("/", async (req, res) => {
  try {
    const list = await getDb(req)
      .collection(RELATIVES_COLLECTION)
      .find({ userId: getUserId(req) })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(list);
  } catch (err) {
    console.error("❌ Relatives load error:", err.message);
    res.status(500).json({ error: "Relatives load nahi ho paaye" });
  }
});

relativesRouter.post("/", async (req, res) => {
  try {
    const data = pickRelativeFields(req.body);
    if (!data.name || !String(data.name).trim()) {
      return res.status(400).json({ error: "Name zaroori hai" });
    }
    const doc = { ...data, userId: getUserId(req), createdAt: new Date() };
    const result = await getDb(req).collection(RELATIVES_COLLECTION).insertOne(doc);
    res.status(201).json({ ...doc, _id: result.insertedId });
  } catch (err) {
    console.error("❌ Relative add error:", err.message);
    res.status(500).json({ error: "Relative add nahi ho paaya" });
  }
});

relativesRouter.put("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid relative id" });
    }
    const data = pickRelativeFields(req.body);
    const result = await getDb(req)
      .collection(RELATIVES_COLLECTION)
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id), userId: getUserId(req) },
        { $set: { ...data, updatedAt: new Date() } },
        { returnDocument: "after" }
      );
    const updated = result?.value ?? result; // mongodb driver v5 aur v6 dono ke liye
    if (!updated || !updated._id) return res.status(404).json({ error: "Relative nahi mila" });
    res.json(updated);
  } catch (err) {
    console.error("❌ Relative update error:", err.message);
    res.status(500).json({ error: "Relative update nahi ho paaya" });
  }
});

relativesRouter.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid relative id" });
    }
    const result = await getDb(req)
      .collection(RELATIVES_COLLECTION)
      .deleteOne({ _id: new ObjectId(req.params.id), userId: getUserId(req) });
    if (!result.deletedCount) return res.status(404).json({ error: "Relative nahi mila" });
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Relative delete error:", err.message);
    res.status(500).json({ error: "Relative delete nahi ho paaya" });
  }
});

// ---------- Login ke peeche wale routes ----------
// requireAuth HAMESHA router se PEHLE lagta hai, warna wo kabhi chalta hi nahi
// ---------- Login + role ke peeche wale routes ----------
app.use("/api/documents", requireAuth, requireRole("patient", "doctor"), documentsRouter);
app.use("/api/doctor/profile", requireAuth, requireRole("doctor"), doctorProfileRouter);
app.use("/api/relatives", requireAuth, requireRole("patient"), relativesRouter);
app.use("/api/plans", requireAuth, requireRole("patient"), plansRouter);
app.use("/api/safety", requireAuth, requireRole("patient"), safetyRouter);
app.use("/api/patients", requireAuth, requireRole("doctor"), patientsRouter);
// ---------- 404 ----------
app.use((req, res) => {
  res.status(404).json({ error: `Route nahi mila: ${req.method} ${req.originalUrl}` });
});

// ---------- Error handler (multer errors bhi yahin aayenge) ----------
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const msg = err.code === "LIMIT_FILE_SIZE" ? "File 10 MB se badi hai" : err.message;
    return res.status(400).json({ error: msg });
  }
  console.error("❌ Server error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

// ---------- DB connect + server start ----------
async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: DATABASE_NAME });
    console.log("✅ Mongoose connected");

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    app.locals.db = client.db(DATABASE_NAME);
    app.locals.safetyDb = client.db(SAFETY_DB_NAME); // Safety routes ko alag DB chahiye to yahan se lo
    console.log("✅ MongoClient connected:", DATABASE_NAME);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup fail:", err.message);
    process.exit(1);
  }
}

start();
