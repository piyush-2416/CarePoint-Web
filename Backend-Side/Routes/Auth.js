import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
// import User from "../models/Users.js";
import User from "../models/User.js";
import { requireAuth, roleOf } from "../Middleware/auth.js";

const router = express.Router();

const isProd = process.env.NODE_ENV === "production";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const cookieBase = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DUMMY_HASH = bcrypt.hashSync("dummy-password-123", 10);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Bahut zyada koshish ho gayi, 15 minute baad try karo" },
});

const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

function setAuthCookie(res, user) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, { ...cookieBase, maxAge: SEVEN_DAYS });
}

function publicUser(u) {
  return { id: u._id, name: u.name, email: u.email, role: roleOf(u) };
}

// ---------- POST /api/auth/signup ----------
router.post("/signup", authLimiter, async (req, res) => {
  try {
    const name = String(req.body?.name ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");
    const role = req.body?.role === "doctor" ? "doctor" : "patient"; // admin yahan se nahi ban sakta

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

    // Doctor banne ke liye invite code zaroori
    if (role === "doctor") {
      const expected = process.env.DOCTOR_INVITE_CODE;
      if (!expected) {
        return res.status(403).json({ message: "Doctor signup abhi band hai" });
      }
      if (!safeEqual(req.body?.inviteCode ?? "", expected)) {
        return res.status(403).json({ message: "Doctor invite code galat hai" });
      }
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Ye email pehle se registered hai" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed, role });

    setAuthCookie(res, user);
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
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

export default router;
