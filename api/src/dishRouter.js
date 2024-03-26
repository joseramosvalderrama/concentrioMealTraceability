import express from "express";
import { repo } from "./db/dishRepository.js";

export const router = express.Router();

const BASE_URL = "/dish";

router.get(`${BASE_URL}`, async (req, res) => {
  const dishes = await repo.findAll();
  res.json(dishes);
});

router.post(`${BASE_URL}`, async (req, res) => {
  const created = await repo.create(req.body);
  res.json(created);
});
