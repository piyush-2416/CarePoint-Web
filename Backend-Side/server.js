import "dotenv/config"; // .env sabse pehle load ho (Gemini.js / Safetyai.js se pehle)
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// NOTE: folder ka naam exactly "Routes" hona chahiye (Linux/Render par case-sensitive hota hai)
import plansRouter from "./Routes/Plans.js";
import safetyRouter from "./Routes/Safety.js";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DB_NAME || "hospital-data";
const SAFETY_DB_NAME = process.env.SAFETY_DB_NAME || DATABASE_NAME;
const DOCTORS_COLLECTION = "Doctors-data";
const MEDICINES_COLLECTION = "Medicine-data";
const DOCUMENTS_COLLECTION = "Documents-data";
const RELATIVES_COLLECTION = "Relatives-data";
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!/^mongodb(\+srv)?:\/\//.test(MONGODB_URI ?? "")) {
  console.error(
    "❌ MONGODB_URI galat ya khali hai. .env mein 'mongodb://' ya 'mongodb+srv://' se shuru hone wala link rakho."
  );
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY .env me nahi mila: AI features sirf fallback jawab denge.");
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Safety Planner + Personal Safety routers (404 handler se PEHLE)
app.use("/api/plans", plansRouter);
app.use("/api/safety", safetyRouter);

const client = new MongoClient(MONGODB_URI);
let db;

async function connectDB() {
  await client.connect();
  db = client.db(DATABASE_NAME);
  console.log("✅ MongoDB Connected");

  // Unique index: same phone do baar save na ho (race condition se bachne ke liye)
  try {
    await db
      .collection(RELATIVES_COLLECTION)
      .createIndex({ phone: 1 }, { unique: true });
  } catch (err) {
    // Agar DB me pehle se duplicate numbers hain to index nahi banega
    console.warn(
      "⚠️ Relatives ka unique phone index nahi ban paya (purane duplicates hatao):",
      err.message
    );
  }

  await mongoose.connect(MONGODB_URI, { dbName: SAFETY_DB_NAME });
  console.log(`✅ Mongoose Connected → db: "${SAFETY_DB_NAME}"`);
}

// Helper: ObjectId, string _id ya custom `id` field, teeno se document dhundo
async function findById(collectionName, id) {
  const col = db.collection(collectionName);

  if (ObjectId.isValid(id)) {
    const doc = await col.findOne({ _id: new ObjectId(id) });
    if (doc) return doc;
  }

  const byStringId = await col.findOne({ _id: id });
  if (byStringId) return byStringId;

  return col.findOne({ id });
}

// ================= File upload setup (multer) =================
const uploadDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

// Sirf ye file types allowed hain (HTML/JS upload se XSS ka risk khatam)
const ALLOWED_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname).toLowerCase());
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10 MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const okExt = ALLOWED_TYPES[file.mimetype]?.includes(ext);
    if (!okExt) {
      const err = new Error("Sirf PDF, JPG, PNG, WEBP ya Word file allowed hai");
      err.code = "INVALID_FILE_TYPE";
      return cb(err);
    }
    cb(null, true);
  },
});

// ================= Relatives: helpers =================
const RELATIONS = [
  "Father", "Mother", "Spouse", "Brother", "Sister", "Son",
  "Daughter", "Relative", "Friend", "Neighbour", "Other",
];

// "+91 98765-43210", "09876543210", "9876543210" -> "9876543210"
// Valid na ho to null (Indian mobile: 10 digit, 6-9 se shuru)
function cleanPhone(raw) {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

function cleanRelation(raw) {
  const v = String(raw ?? "").trim().toLowerCase();
  return RELATIONS.find((r) => r.toLowerCase() === v) || "Other";
}

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// ================= Doctors / Medicines =================

// Route 1: Saare doctors
app.get("/api/products", async (req, res) => {
  try {
    const data = await db.collection(DOCTORS_COLLECTION).find().toArray();
    res.json(data);
  } catch (error) {
    console.error("GET /api/products:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route 2: Saari medicines
app.get("/api/Medicines", async (req, res) => {
  try {
    const data = await db.collection(MEDICINES_COLLECTION).find().toArray();
    res.json(data);
  } catch (error) {
    console.error("GET /api/Medicines:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route 3: Single doctor by ID (purana route)
app.get("/api/products/:id", async (req, res) => {
  try {
    const doc = await findById(DOCTORS_COLLECTION, req.params.id);
    if (!doc) return res.status(404).json({ error: "Doctor nahi mila!" });
    res.json(doc);
  } catch (error) {
    console.error("GET /api/products/:id:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route 4: Single doctor by ID (detail page)
app.get("/api/Doctorid/:id", async (req, res) => {
  try {
    const doc = await findById(DOCTORS_COLLECTION, req.params.id);
    if (!doc) return res.status(404).json({ error: "Doctor nahi mila!" });
    res.json(doc);
  } catch (error) {
    console.error("GET /api/Doctorid/:id:", error);
    res.status(500).json({ error: error.message });
  }
});

// ================= Patient Documents routes =================

// Route 5: Saare documents (naye pehle)
app.get("/api/documents", async (req, res) => {
  try {
    const docs = await db
      .collection(DOCUMENTS_COLLECTION)
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json(docs);
  } catch (error) {
    console.error("GET /api/documents:", error);
    res.status(500).json({ message: "Documents load nahi hue" });
  }
});

// Route 6: Naya document upload
app.post("/api/documents", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File select karo" });
    }

    const body = req.body ?? {};
    const title = String(body.title ?? "").trim();
    if (!title) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ message: "Title zaroori hai" });
    }

    const newDoc = {
      title: title.slice(0, 120),
      category: String(body.category || "Other").slice(0, 40),
      notes: String(body.notes || "").slice(0, 1000),
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      createdAt: new Date(),
    };

    const result = await db.collection(DOCUMENTS_COLLECTION).insertOne(newDoc);
    res.status(201).json({ _id: result.insertedId, ...newDoc });
  } catch (error) {
    console.error("POST /api/documents:", error);
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ message: "Upload fail ho gaya" });
  }
});

// Route 7: File dekho ya download karo (?download=true se download hoga)
app.get("/api/documents/:id/file", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Galat document id" });
    }

    const doc = await db
      .collection(DOCUMENTS_COLLECTION)
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ message: "Document nahi mila" });

    const filePath = path.join(uploadDir, path.basename(doc.storedName));
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File server par nahi hai" });
    }

    if (req.query.download === "true") {
      return res.download(filePath, doc.originalName);
    }
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.type(doc.mimeType || "application/octet-stream");
    res.sendFile(filePath);
  } catch (error) {
    console.error("GET /api/documents/:id/file:", error);
    if (!res.headersSent) res.status(500).json({ message: "File open nahi hui" });
  }
});

// Route 8: Document delete (DB document + file dono)
app.delete("/api/documents/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Galat document id" });
    }

    const result = await db
      .collection(DOCUMENTS_COLLECTION)
      .findOneAndDelete({ _id: new ObjectId(req.params.id) });

    // driver v6+ seedha document deta hai, purane versions { value } me
    const deleted = result && "value" in result ? result.value : result;
    if (!deleted || !deleted.storedName) {
      return res.status(404).json({ message: "Document nahi mila" });
    }

    fs.unlink(path.join(uploadDir, path.basename(deleted.storedName)), () => {});
    res.json({ message: "Document delete ho gaya" });
  } catch (error) {
    console.error("DELETE /api/documents/:id:", error);
    res.status(500).json({ message: "Delete fail ho gaya" });
  }
});

// ================= Relatives routes =================
// TODO: login lagne par har document me patientId jodo aur usi se filter karo.
// TODO: DELETE /api/relatives (poori list) ko auth ke peeche rakho.

// Route 9: Saare relatives (naye pehle)
app.get("/api/relatives", async (req, res) => {
  try {
    const list = await db
      .collection(RELATIVES_COLLECTION)
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json(list);
  } catch (error) {
    console.error("GET /api/relatives:", error);
    res.status(500).json({ message: "Relatives load nahi hue" });
  }
});

// Route 10: Ek relative add karo
// body = { name, phone, relation, isEmergency }
app.post("/api/relatives", async (req, res) => {
  try {
    const body = req.body ?? {};
    const name = String(body.name ?? "").trim();
    const phone = cleanPhone(body.phone);

    if (!name) return res.status(400).json({ message: "Naam zaroori hai" });
    if (!phone) {
      return res.status(400).json({ message: "Sahi 10 digit ka mobile number daalo" });
    }

    const col = db.collection(RELATIVES_COLLECTION);
    const exists = await col.findOne({ phone });
    if (exists) {
      return res.status(409).json({ message: `Ye number pehle se saved hai (${exists.name})` });
    }

    const doc = {
      name: name.slice(0, 60),
      phone,
      relation: cleanRelation(body.relation),
      isEmergency: body.isEmergency === true || body.isEmergency === "true",
      createdAt: new Date(),
    };
    const result = await col.insertOne(doc);
    res.status(201).json({ _id: result.insertedId, ...doc });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Ye number pehle se saved hai" });
    }
    console.error("POST /api/relatives:", error);
    res.status(500).json({ message: "Relative save nahi ho paya" });
  }
});

// Route 11: CSV se bahut saare relatives ek saath
// body = { relatives: [{ name, phone, relation }] }
app.post("/api/relatives/bulk", async (req, res) => {
  try {
    const body = req.body ?? {};
    const incoming = Array.isArray(body.relatives) ? body.relatives.slice(0, 500) : [];

    const seen = new Set();
    const docs = [];
    let invalid = 0;
    let fileDuplicates = 0;

    for (const r of incoming) {
      const name = String(r?.name ?? "").trim();
      const phone = cleanPhone(r?.phone);
      if (!name || !phone) {
        invalid++;
        continue;
      }
      if (seen.has(phone)) {
        fileDuplicates++;
        continue;
      }
      seen.add(phone);
      docs.push({
        name: name.slice(0, 60),
        phone,
        relation: cleanRelation(r.relation),
        isEmergency: false,
        createdAt: new Date(),
      });
    }

    if (docs.length === 0) {
      return res.status(400).json({ message: "Koi valid contact nahi mila", invalid });
    }

    const col = db.collection(RELATIVES_COLLECTION);
    const existing = await col
      .find({ phone: { $in: docs.map((d) => d.phone) } })
      .project({ phone: 1 })
      .toArray();
    const existingPhones = new Set(existing.map((e) => e.phone));
    const fresh = docs.filter((d) => !existingPhones.has(d.phone));

    let added = 0;
    if (fresh.length > 0) {
      try {
        const r = await col.insertMany(fresh, { ordered: false });
        added = r.insertedCount;
      } catch (err) {
        // Race me koi duplicate nikla to baaki phir bhi save ho jaate hain
        if (err?.code === 11000) added = err.result?.insertedCount ?? err.insertedCount ?? 0;
        else throw err;
      }
    }

    res.status(201).json({
      added,
      duplicates: fileDuplicates + (docs.length - added),
      invalid,
    });
  } catch (error) {
    console.error("POST /api/relatives/bulk:", error);
    res.status(500).json({ message: "Contacts save nahi ho paye" });
  }
});

// Route 12: Relative update (jo fields bhejoge wahi badlengi)
app.patch("/api/relatives/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Galat id" });
    }
    const body = req.body ?? {};
    const _id = new ObjectId(req.params.id);
    const col = db.collection(RELATIVES_COLLECTION);
    const updates = {};

    if ("isEmergency" in body) {
      updates.isEmergency = body.isEmergency === true || body.isEmergency === "true";
    }
    if ("relation" in body) {
      updates.relation = cleanRelation(body.relation);
    }
    if ("name" in body) {
      const name = String(body.name ?? "").trim();
      if (!name) return res.status(400).json({ message: "Naam zaroori hai" });
      updates.name = name.slice(0, 60);
    }
    if ("phone" in body) {
      const phone = cleanPhone(body.phone);
      if (!phone) {
        return res.status(400).json({ message: "Sahi 10 digit ka mobile number daalo" });
      }
      const clash = await col.findOne({ phone, _id: { $ne: _id } });
      if (clash) {
        return res.status(409).json({ message: `Ye number pehle se saved hai (${clash.name})` });
      }
      updates.phone = phone;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Badalne ke liye kuch nahi mila" });
    }

    const result = await col.updateOne({ _id }, { $set: updates });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Relative nahi mila" });
    }
    res.json({ message: "Update ho gaya", ...updates });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Ye number pehle se saved hai" });
    }
    console.error("PATCH /api/relatives/:id:", error);
    res.status(500).json({ message: "Update nahi ho paya" });
  }
});

// Route 13: Saari relatives list delete
app.delete("/api/relatives", async (req, res) => {
  try {
    const result = await db.collection(RELATIVES_COLLECTION).deleteMany({});
    res.json({ message: "Poori list hat gayi", deleted: result.deletedCount });
  } catch (error) {
    console.error("DELETE /api/relatives:", error);
    res.status(500).json({ message: "Delete nahi ho paya" });
  }
});

// Route 14: Ek relative delete
app.delete("/api/relatives/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Galat id" });
    }
    const result = await db
      .collection(RELATIVES_COLLECTION)
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Relative nahi mila" });
    }
    res.json({ message: "Delete ho gaya" });
  } catch (error) {
    console.error("DELETE /api/relatives/:id:", error);
    res.status(500).json({ message: "Delete nahi ho paya" });
  }
});

// ================= Error handling =================

// Unknown route (error handler se pehle, sabse last routes me)
app.use((req, res) => {
  res.status(404).json({ error: "Route nahi mila" });
});

// Central error handler (4 arguments zaroori hain)
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err instanceof multer.MulterError) {
    const msg = err.code === "LIMIT_FILE_SIZE" ? "File 10 MB se badi hai" : err.message;
    return res.status(400).json({ message: msg });
  }
  if (err?.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({ message: err.message });
  }
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Galat JSON bheja gaya" });
  }
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ message: "Data bahut bada hai" });
  }

  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server me kuch gadbad ho gayi" });
});

// ================= Start / Shutdown =================
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);

      console.log(`\n🛡️ Safety Planner Routes:`);
      console.log(`   POST   /api/plans/generate`);
      console.log(`   GET    /api/plans`);
      console.log(`   GET    /api/plans/:id`);
      console.log(`   PATCH  /api/plans/:id/progress`);
      console.log(`   DELETE /api/plans/:id`);

      console.log(`\n🆘 Personal Safety Routes:`);
      console.log(`   POST   /api/safety/assess`);
      console.log(`   POST   /api/safety/sos\n`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} pehle se use me hai. .env me PORT badlo ya purana server band karo.`);
      } else {
        console.error("❌ Server error:", err.message);
      }
      process.exit(1);
    });

    const shutdown = async () => {
      console.log("\n🛑 Server band ho raha hai...");
      server.close();
      await Promise.allSettled([client.close(), mongoose.disconnect()]);
      process.exit(0);
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })
  .catch((error) => {
    console.error("❌ DB Error:", error.message);
    process.exit(1);
  });

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
