import express from "express";
import { router as dishRouter } from "./dishRouter.js";
import { router as restaurantRouter } from "./restaurantRouter.js";
import { router as scoreRouter } from "./scoreRouter.js";
import { router as userRouter } from "./userRouter.js";
import { verifyToken } from "./middleware/auth.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(userRouter);
app.use((req, res, next) => verifyToken(req, res, next));
app.use(dishRouter);
app.use(restaurantRouter);
app.use(scoreRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
