import express from "express";
import { router as mealRouter } from "./mealReviewRouter.js";
import { router as restaurantRouter } from "./restaurantRouter.js";

const app = express();

//Convert json bodies to JavaScript object
app.use(express.json());
app.use(mealRouter);
app.use(restaurantRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
