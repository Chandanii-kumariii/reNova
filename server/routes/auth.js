import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbGet, dbRun } from "../db.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "sr_void_super_secret_cipher_phrase_key";

// signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required fields." });
  }

  try {
    // Check if user already exists
    const existingUser = await dbGet("SELECT * FROM users WHERE email = ?", [email.toLowerCase().trim()]);
    if (existingUser) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store in DB
    const result = await dbRun(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name.trim(), email.toLowerCase().trim(), hashedPassword]
    );

    // Create token
    const token = jwt.sign(
      { id: result.id, email: email.toLowerCase().trim() },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully.",
      user: { id: result.id, name: name.trim(), email: email.toLowerCase().trim() },
      token
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to initialize node account in registry." });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required fields." });
  }

  try {
    // Check if user exists
    const user = await dbGet("SELECT * FROM users WHERE email = ?", [email.toLowerCase().trim()]);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password credentials." });
    }

    // Verify password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password credentials." });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Synchronized session successfully.",
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to authenticate session portal." });
  }
});

// me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await dbGet("SELECT id, name, email FROM users WHERE id = ?", [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: "User profile not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Auth status error:", error);
    res.status(500).json({ error: "Failed to verify access permissions." });
  }
});

export default router;
