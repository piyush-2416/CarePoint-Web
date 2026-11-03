import  express from "express";
import { ObjectId } from "mongodb";
import { requireRole, roleOf } from "../Middleware/auth.js";

const DOCTORS_COLLECTION = "Doctors-data";
const APPOINTMENTS_COLLECTION = "Appointments-data";

// Frontend (Doctorid.jsx) ki TIME_SLOTS se bilkul same rakhna
const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"];
const MAX_DAYS_AHEAD = 100; // ~3 mahine
const MAX_ACTIVE_PER_PATIENT = 10; // ek patient ek saath itni hi active appointments rakh sakta hai

const router = express.Router();
const apptCol = (req) => req.app.locals.db.collection(APPOINTMENTS_COLLECTION);

// activeSlot sirf pending/accepted appointment par hota hai. Unique + sparse index
// ek slot par do active booking hone hi nahi deta (race condition mein bhi)
let indexReady = false;
async function ensureIndexes(col) {
  if (indexReady) return;
  await col.createIndex({ activeSlot: 1 }, { unique: true, sparse: true });
  await col.createIndex({ patientId: 1, dateTime: 1 });
  await col.createIndex({ doctorUserId: 1, dateTime: 1 });
  indexReady = true;
}

// "2026-11-20" + "9:00 AM" -> Date (India time, server kisi bhi timezone mein ho)
function slotDate(dateKey, time) {
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
  const tm = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(time);
  if (!dm || !tm) return null;

  const [y, m, d] = [Number(dm[1]), Number(dm[2]), Number(dm[3])];
  if (new Date(Date.UTC(y, m - 1, d)).getUTCDate() !== d) return null; // 31 Feb jaisi date

  let h = Number(tm[1]) % 12;
  if (tm[3] === "PM") h += 12;
  const when = new Date(`${dateKey}T${String(h).padStart(2, "0")}:${tm[2]}:00+05:30`);
  return Number.isNaN(when.getTime()) ? null : when;
}

function cleanPhone(raw) {
  let d = String(raw ?? "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

async function findDoctor(req, id) {
  const col = req.app.locals.db.collection(DOCTORS_COLLECTION);
  if (ObjectId.isValid(id)) {
    const d = await col.findOne({ _id: new ObjectId(id) });
    if (d) return d;
  }
  return col.findOne({ _id: String(id) });
}

// activeSlot andar ki cheez hai, bahar nahi bhejte
const pub = ({ activeSlot, ...rest }) => rest;

// ---------- POST /api/appointments  (sirf patient) ----------
router.post("/", requireRole("patient"), async (req, res) => {
  try {
    const b = req.body ?? {};
    const doctorId = String(b.doctorId ?? "");
    const dateKey = String(b.dateKey ?? "");
    const time = String(b.time ?? "");
    const patientName = String(b.patientName ?? "").trim();
    const reason = String(b.reason ?? "").trim();
    const phone = cleanPhone(b.phone);

    if (patientName.length < 2 || patientName.length > 60) {
      return res.status(400).json({ message: "Patient ka naam 2 se 60 letters ka ho" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Sahi 10 digit ka mobile number daalo" });
    }
    if (reason.length > 300) {
      return res.status(400).json({ message: "Problem ka note 300 characters se chhota ho" });
    }
    if (!TIME_SLOTS.includes(time)) {
      return res.status(400).json({ message: "Galat time slot" });
    }

    const when = slotDate(dateKey, time);
    if (!when) return res.status(400).json({ message: "Galat date" });
    const now = Date.now();
    if (when.getTime() <= now) {
      return res.status(400).json({ message: "Ye time nikal chuka hai, aage ka slot chuno" });
    }
    if (when.getTime() > now + MAX_DAYS_AHEAD * 86400000) {
      return res.status(400).json({ message: "Itni aage ki booking nahi ho sakti" });
    }

    const doctor = await findDoctor(req, doctorId);
    if (!doctor || doctor.isProfileComplete === false) {
      return res.status(404).json({ message: "Doctor nahi mila" });
    }

    const col = apptCol(req);
    await ensureIndexes(col);
    const patientId = String(req.user._id);

    const active = await col.countDocuments({
      patientId,
      activeSlot: { $exists: true },
      dateTime: { $gt: new Date() },
    });
    if (active >= MAX_ACTIVE_PER_PATIENT) {
      return res.status(429).json({ message: "Aapki bahut saari appointments pehle se active hain" });
    }

    const doc = {
      patientId,
      patientAccountName: req.user.name,
      patientEmail: req.user.email,
      patientName,
      phone,
      reason,
      doctorId: String(doctor._id),
      doctorUserId: doctor.userId ? String(doctor.userId) : "",
      doctorName: doctor.name,
      specialization: doctor.specialization || "",
      dateKey,
      time,
      dateTime: when,
      status: "pending",
      doctorNote: "",
      activeSlot: `${doctor._id}|${dateKey}|${time}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await col.insertOne(doc);
    res.status(201).json(pub({ _id: result.insertedId, ...doc }));
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Ye slot abhi kisi aur ne book kar liya. Dusra time chuno." });
    }
    console.error("❌ Appointment create error:", err.message);
    res.status(500).json({ message: "Appointment book nahi ho paayi" });
  }
});

// ---------- GET /api/appointments/booked?doctorId=..&dateKey=YYYY-MM-DD ----------
// Sirf bhare hue times, koi personal detail nahi
router.get("/booked", async (req, res) => {
  try {
    const doctorId = String(req.query.doctorId ?? "");
    const dateKey = String(req.query.dateKey ?? "");
    if (!doctorId || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
      return res.status(400).json({ message: "doctorId aur dateKey chahiye" });
    }
    const rows = await apptCol(req)
      .find({ doctorId, dateKey, activeSlot: { $exists: true } })
      .project({ time: 1, _id: 0 })
      .toArray();
    res.json({ booked: rows.map((r) => r.time) });
  } catch (err) {
    console.error("❌ Booked slots error:", err.message);
    res.status(500).json({ message: "Slots load nahi ho paaye" });
  }
});

// ---------- GET /api/appointments/mine ----------
// Patient ko apni, doctor ko apne paas aayi hui appointments
router.get("/mine", async (req, res) => {
  try {
    const me = String(req.user._id);
    const filter = roleOf(req.user) === "doctor" ? { doctorUserId: me } : { patientId: me };
    const list = await apptCol(req)
      .find(filter)
      .project({ activeSlot: 0 })
      .sort({ dateTime: 1 })
      .limit(500)
      .toArray();
    res.json(list);
  } catch (err) {
    console.error("❌ Appointments load error:", err.message);
    res.status(500).json({ message: "Appointments load nahi ho paayi" });
  }
});

// ---------- GET /api/appointments/:id ----------
router.get("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Galat appointment id" });
    }
    const me = String(req.user._id);
    const appt = await apptCol(req).findOne(
      {
        _id: new ObjectId(req.params.id),
        $or: [{ patientId: me }, { doctorUserId: me }], // doosre ki appointment 404 dikhegi
      },
      { projection: { activeSlot: 0 } }
    );
    if (!appt) return res.status(404).json({ message: "Appointment nahi mili" });
    res.json(appt);
  } catch (err) {
    console.error("❌ Appointment detail error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- PATCH /api/appointments/:id/status  (sirf doctor: accept ya deny) ----------
router.patch("/:id/status", requireRole("doctor"), async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Galat appointment id" });
    }
    const status = req.body?.status;
    if (!["accepted", "denied"].includes(status)) {
      return res.status(400).json({ message: "Status 'accepted' ya 'denied' hona chahiye" });
    }
    const note = String(req.body?.note ?? "").trim().slice(0, 200);

    const _id = new ObjectId(req.params.id);
    const me = String(req.user._id);
    const col = apptCol(req);

    const update = {
      $set: { status, doctorNote: note, decidedAt: new Date(), updatedAt: new Date() },
    };
    if (status === "denied") update.$unset = { activeSlot: "" }; // slot wapas khali

    // Sirf apni aur sirf pending appointment par chalega
    const result = await col.findOneAndUpdate(
      { _id, doctorUserId: me, status: "pending" },
      update,
      { returnDocument: "after", projection: { activeSlot: 0 } }
    );
    const updated = result?.value ?? result; // driver v5 aur v6 dono ke liye

    if (!updated || !updated._id) {
      const existing = await col.findOne({ _id, doctorUserId: me }, { projection: { status: 1 } });
      if (!existing) return res.status(404).json({ message: "Appointment nahi mili" });
      return res.status(409).json({ message: `Ye appointment pehle hi ${existing.status} ho chuki hai` });
    }
    res.json(updated);
  } catch (err) {
    console.error("❌ Appointment status error:", err.message);
    res.status(500).json({ message: "Update nahi ho paya" });
  }
});

// ---------- PATCH /api/appointments/:id/cancel  (sirf patient, sirf apni) ----------
router.patch("/:id/cancel", requireRole("patient"), async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Galat appointment id" });
    }
    const _id = new ObjectId(req.params.id);
    const me = String(req.user._id);
    const col = apptCol(req);

    const result = await col.findOneAndUpdate(
      { _id, patientId: me, status: { $in: ["pending", "accepted"] } },
      {
        $set: { status: "cancelled", cancelledAt: new Date(), updatedAt: new Date() },
        $unset: { activeSlot: "" },
      },
      { returnDocument: "after", projection: { activeSlot: 0 } }
    );
    const updated = result?.value ?? result;

    if (!updated || !updated._id) {
      const existing = await col.findOne({ _id, patientId: me }, { projection: { status: 1 } });
      if (!existing) return res.status(404).json({ message: "Appointment nahi mili" });
      return res.status(409).json({ message: `Ye appointment ${existing.status} hai, cancel nahi ho sakti` });
    }
    res.json(updated);
  } catch (err) {
    console.error("❌ Appointment cancel error:", err.message);
    res.status(500).json({ message: "Cancel nahi ho paya" });
  }
});

export default router;