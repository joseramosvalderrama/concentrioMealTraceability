import express from "express";
import { router as mealRouter } from "./mealReviewRouter.js";

const app = express();

//Convert json bodies to JavaScript object
app.use(express.json());
app.use(mealRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
