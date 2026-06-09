import express from "express";
import { dbRun, dbGet } from "../db.js";

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({ error: "Email is a required field." });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    // Check if already subscribed
    const existing = await dbGet("SELECT * FROM newsletter WHERE email = ?", [normalizedEmail]);
    if (existing) {
      return res.status(200).json({ message: "This email address is already subscribed." });
    }

    // Insert new subscription
    await dbRun("INSERT INTO newsletter (email) VALUES (?)", [normalizedEmail]);
    res.status(201).json({ message: "Successfully subscribed to the newsletter registry." });
  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(500).json({ error: "Failed to store email subscription on backend database." });
  }
});

export default router;
