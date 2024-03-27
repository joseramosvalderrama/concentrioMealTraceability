import express from "express";
import { repo as restaurantRepo } from "./db/restaurantRepository.js";
import { repo as dishRepo } from "./db/dishRepository.js";
import { repo as scoreRepo } from "./db/scoreRepository.js";

export const router = express.Router();

const BASE_URL = "/restaurant";

router.get(`${BASE_URL}/statistic/main`, async (req, res) => {
  const restaurants = await restaurantRepo.findAll();
  const dishes = await dishRepo.findAll();
  const scores = await scoreRepo.findAll();

  const dishGroupByUuid = dishes.reduce((acc, dish) => {
    acc[dish.uuid] = dish;
    return acc;
  }, {});

  const bodyResponse = restaurants.map((restaurant) => {
    const restaurantScores = scores.filter(
      (score) => score.restaurantUuid === restaurant.uuid
    );
    const average = getAverage(restaurantScores.map((score) => score.score));
    const dishRestaurantScores = restaurantScores.reduce((acc, el) => {
      const { dishUuid, score } = el;
      if (!acc[dishUuid]) {
        acc[dishUuid] = [score];
      } else {
        acc[dishUuid].push(score);
      }
      return acc;
    }, {});

    const dishesOrderedByScore = Object.entries(dishRestaurantScores)
      .map(([key, value]) => ({
        ...dishGroupByUuid[key],
        score: getAverage(value),
      }))
      .sort((a, b) => b.score - a.score);
    return {
      ...restaurant,
      average: average,
      dishesOrderedByScore: dishesOrderedByScore,
    };
  });
  res.json(bodyResponse);
});

const getAverage = (list) =>
  list.reduce((acc, num) => acc + num, 0) / list.length;

router.get(`${BASE_URL}`, async (req, res) => {
  const restaurants = await restaurantRepo.findAll();
  res.json(restaurants);
});

router.post(`${BASE_URL}`, async (req, res) => {
  await restaurantRepo.create(req.body);
  res.sendStatus(200);
});

router.get(`${BASE_URL}/:uuid`, async (req, res) => {
  const uuid = req.params.uuid;
  const restaurant = await restaurantRepo.findByUuid(uuid);
  res.json(restaurant);
});

router.put(`${BASE_URL}`, async (req, res) => {
  await restaurantRepo.update(req.body);
  res.sendStatus(200);
});

router.delete(`${BASE_URL}/:uuid`, async (req, res) => {
  await restaurantRepo.deleteByUuid(req.params.uuid);
  res.sendStatus(200);
});
