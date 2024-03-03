import express from "express";
import { repo } from "./db/mealRepository.js";

export const router = express.Router();

router.get("/review", async (req, res) => {
  const reviews = await repo.findAll();
  res.json(reviews);
});

router.post("/review", async (req, res) => {
  await repo.create(req.body);
  res.sendStatus(200);
});
