import express from "express";
import { repo } from "./db/restaurantRepository.js";

export const router = express.Router();

router.get("/restaurant", async (req, res) => {
  const restaurants = await repo.findAll();
  res.json(restaurants);
});

router.post("/restaurant", async (req, res) => {
  await repo.create(req.body);
  res.sendStatus(200);
});

router.get("/restaurant/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const restaurant = await repo.findByUuid(uuid);
  res.json(restaurant);
});

router.put("/restaurant", async (req, res) => {
  await repo.update(req.body);
  res.sendStatus(200);
});

router.delete("/restaurant/:uuid", async (req, res) => {
  await repo.deleteByUuid(req.params.uuid);
  res.sendStatus(200);
});
