import express from "express";

const app = express();

//Convert json bodies to JavaScript object
app.use(express.json());

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
