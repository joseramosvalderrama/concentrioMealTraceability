import express from "express";
import { repo } from "./db/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const router = express.Router();

router.post(`/register`, async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    repo.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post(`/login`, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await repo.findByUserName(username);
    console.log({ user });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user.uuid }, "concentrio", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});
