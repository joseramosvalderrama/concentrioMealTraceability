import sequelize_pkg from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { Sequelize } = sequelize_pkg;
console.log(process.env.DB_NAME);

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

console.log("Connected to Postgresql");
