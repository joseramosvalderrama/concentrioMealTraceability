import sequelize_pkg from "sequelize";

const { Sequelize, Model, DataTypes } = sequelize_pkg;

const sequelize = new Sequelize("meals", "root", "password", {
  host: "localhost",
  dialect: "postgres",
});

console.log("Connected to Postgresql");
