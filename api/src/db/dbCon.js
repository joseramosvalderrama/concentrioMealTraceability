import sequelize_pkg from "sequelize";

const { Sequelize } = sequelize_pkg;

export const sequelize = new Sequelize("mealReview", "root", "password", {
  host: "localhost",
  dialect: "postgres",
});

console.log("Connected to Postgresql");
