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

router.get("/review/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const review = await repo.findByUuid(uuid);
  res.json(review);
});

router.put("/review", async (req, res) => {
  await repo.update(req.body);
  res.sendStatus(200);
});

router.delete("/review/:uuid", async (req, res) => {
  await repo.deleteByUuid(req.params.uuid);
  res.sendStatus(200);
});
