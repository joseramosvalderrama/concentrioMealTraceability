import express from "express";
import { router as dishRouter } from "./dishRouter.js";
import { router as restaurantRouter } from "./restaurantRouter.js";
import { router as scoreRouter } from "./scoreRouter.js";

const app = express();

//Convert json bodies to JavaScript object
app.use(express.json());
app.use(dishRouter);
app.use(restaurantRouter);
app.use(scoreRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
