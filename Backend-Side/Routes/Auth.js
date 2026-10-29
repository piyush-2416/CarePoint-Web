import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import User from "../Models/User.js";
import { requireAuth } from "../Middleware/auth.js";

const router = express.Router();

const isProd = process.env.NODE_ENV === "production";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

// Frontend aur backend alag domain pe ho (production) to sameSite "none" + secure chahiye
const cookieBase = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Dummy hash: user na mile tab bhi compare chalta hai, taaki timing se pata na chale
const DUMMY_HASH = bcrypt.hashSync("dummy-password-123", 10);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Bahut zyada koshish ho gayi, 15 minute baad try karo" },
});

function setAuthCookie(res, user) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, { ...cookieBase, maxAge: SEVEN_DAYS });
}

function publicUser(u) {
  return { id: u._id, name: u.name, email: u.email, role: u.role };
}

// ---------- POST /api/auth/signup ----------
router.post("/signup", authLimiter, async (req, res) => {
  try {
    const name = String(req.body?.name ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");

    if (name.length < 2 || name.length > 60) {
      return res.status(400).json({ message: "Naam 2 se 60 letters ka hona chahiye" });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ message: "Sahi email daalo" });
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({
        message: "Password kam se kam 8 characters ka ho, usme letter aur number dono hon",
      });
    }
    if (password.length > 72) {
      return res.status(400).json({ message: "Password 72 characters se chhota rakho" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Ye email pehle se registered hai" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed });

    setAuthCookie(res, user); // signup ke baad seedha login
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Ye email pehle se registered hai" });
    }
    console.error("POST /api/auth/signup:", error);
    res.status(500).json({ message: "Signup nahi ho paya" });
  }
});

// ---------- POST /api/auth/login ----------
router.post("/login", authLimiter, async (req, res) => {
  try {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");

    if (!email || !password) {
      return res.status(400).json({ message: "Email aur password dono daalo" });
    }

    const user = await User.findOne({ email }).select("+password");
    const ok = await bcrypt.compare(password, user ? user.password : DUMMY_HASH);

    if (!user || !ok) {
      return res.status(401).json({ message: "Email ya password galat hai" });
    }

    setAuthCookie(res, user);
    res.json({ user: publicUser(user) });
  } catch (error) {
    console.error("POST /api/auth/login:", error);
    res.status(500).json({ message: "Login nahi ho paya" });
  }
});

// ---------- POST /api/auth/logout ----------
router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieBase);
  res.json({ message: "Logout ho gaya" });
});

// ---------- GET /api/auth/me ----------
// Page refresh par frontend yahin se pata karta hai ki user login hai ya nahi
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

export default router;