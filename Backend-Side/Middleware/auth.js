import jwt from "jsonwebtoken";
import User from "../Models/User.js";

// Jin routes ko login ke peeche rakhna hai, unpe ye lagao
export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Pehle login karo" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User nahi mila" });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Session expire ho gaya, dobara login karo" });
  }
}

// Sirf admin ke liye (optional)
export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Sirf admin ko allowed hai" });
  }
  next();
}
