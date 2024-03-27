import express from "express";
import { repo } from "./db/scoreRepository.js";

export const router = express.Router();

const BASE_URL = "/score";

router.get(`${BASE_URL}`, async (req, res) => {
  const reviews = await repo.findAll();
  res.json(reviews);
});

router.post(`${BASE_URL}`, async (req, res) => {
  await repo.create({ ...req.body, userUuid: req.userId });
  res.sendStatus(200);
});

router.get(`${BASE_URL}/:uuid`, async (req, res) => {
  const uuid = req.params.uuid;
  const review = await repo.findByUuid(uuid);
  res.json(review);
});

router.put(`${BASE_URL}`, async (req, res) => {
  await repo.update(req.body);
  res.sendStatus(200);
});

router.delete(`${BASE_URL}/:uuid`, async (req, res) => {
  await repo.deleteByUuid(req.params.uuid);
  res.sendStatus(200);
});
