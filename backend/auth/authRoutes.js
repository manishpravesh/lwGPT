import express from "express";
import { users } from "../auth/userStore.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Incomplete Details" });
    }
    const duplicateUser = users.find((u) => u.email === email);
    if (duplicateUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    users.push({
      id: users.length + 1,
      email: email,
      passwordHash: passwordHash,
      role: "free",
      createdAt: new Date(),
    });
    res.status(201).json({ message: "Registration Successfull" });
  } catch (e) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ error: "Invalid Cred." });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
