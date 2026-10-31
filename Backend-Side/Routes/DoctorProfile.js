import express from "express";

const DOCTORS_COLLECTION = "Doctors-data";
const router = express.Router();

const getCol = (req) => req.app.locals.db.collection(DOCTORS_COLLECTION);

// Seed doctors ke paas userId nahi hota, isliye sparse index
let indexReady = false;
async function ensureIndex(col) {
  if (indexReady) return;
  await col.createIndex({ userId: 1 }, { unique: true, sparse: true });
  indexReady = true;
}

const isComplete = (d) =>
  Boolean(d.specialization && d.qualification && d.experience && d.availableTime && Number(d.consultationFee) > 0);

// Profile nahi hai to khali record bana do
async function getOrCreate(req) {
  const col = getCol(req);
  await ensureIndex(col);
  const userId = String(req.user._id);

  await col.updateOne(
    { userId },
    {
      $setOnInsert: {
        userId,
        name: req.user.name,
        email: req.user.email,
        specialization: "",
        qualification: "",
        experience: "",
        availableTime: "",
        consultationFee: 0,
        image: "",
        hospital: "",
phone: "",
        rating: 0,
        patientsTreated: 0,
        isProfileComplete: false,
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );
  return col.findOne({ userId });
}

// GET /api/doctor/profile
router.get("/", async (req, res) => {
  try {
    res.json(await getOrCreate(req));
  } catch (err) {
    console.error("❌ Doctor profile load error:", err.message);
    res.status(500).json({ message: "Profile load nahi ho paya" });
  }
});

// PUT /api/doctor/profile
router.put("/", async (req, res) => {
  try {
    const b = req.body ?? {};
    const specialization = String(b.specialization ?? "").trim();
    const qualification = String(b.qualification ?? "").trim();
    const availableTime = String(b.availableTime ?? "").trim();
    const image = String(b.image ?? "").trim();
    const hospital = String(b.hospital ?? "").trim();
const phone = String(b.phone ?? "").replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    const years = Number(b.experienceYears);
    const fee = Number(b.consultationFee);

    if (specialization.length < 2 || specialization.length > 60) {
      return res.status(400).json({ message: "Specialization 2 se 60 letters ki ho" });
    }
    if (qualification.length < 2 || qualification.length > 100) {
      return res.status(400).json({ message: "Qualification 2 se 100 letters ki ho" });
    }
    if (!Number.isFinite(years) || years < 0 || years > 70) {
      return res.status(400).json({ message: "Experience 0 se 70 saal ke beech ho" });
    }
    if (!Number.isFinite(fee) || fee < 1 || fee > 100000) {
      return res.status(400).json({ message: "Fee 1 se 1,00,000 ke beech ho" });
    }
    if (availableTime.length < 3 || availableTime.length > 80) {
      return res.status(400).json({ message: "Timing 3 se 80 characters ki ho" });
    }
    if (image && !/^https?:\/\/\S+$/i.test(image)) {
      return res.status(400).json({ message: "Image ka link http:// ya https:// se shuru ho" });
    }
    if (image.length > 500) {
      return res.status(400).json({ message: "Image ka link bahut lamba hai" });
    }if (hospital.length > 100) {
  return res.status(400).json({ message: "Hospital ka naam 100 characters se chhota ho" });
}
if (phone && !/^[6-9]\d{9}$/.test(phone)) {
  return res.status(400).json({ message: "Sahi 10 digit ka mobile number daalo" });
}

    await getOrCreate(req); // record pakka maujood ho

    const updates = {
      name: req.user.name,
      email: req.user.email,
      specialization,
      qualification,
      experience: `${Math.round(years)} years`, // Doctors.jsx isi format se filter karta hai
      consultationFee: Math.round(fee),
      availableTime,
      image,
      hospital,
phone,
      updatedAt: new Date(),
    };
    updates.isProfileComplete = isComplete(updates);

    const col = getCol(req);
    await col.updateOne({ userId: String(req.user._id) }, { $set: updates });
    res.json(await col.findOne({ userId: String(req.user._id) }));
  } catch (err) {
    console.error("❌ Doctor profile save error:", err.message);
    res.status(500).json({ message: "Profile save nahi ho paya" });
  }
});

export default router;
