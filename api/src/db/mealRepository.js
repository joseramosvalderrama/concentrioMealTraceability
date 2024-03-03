import sequelize_pkg from "sequelize";
import { sequelize } from "./dbCon.js";
import { toPlainObj } from "./util.js";

const { Model, DataTypes } = sequelize_pkg;

let MealReview = class extends Model {};
MealReview = MealReview.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    score: DataTypes.FLOAT,
    comment: DataTypes.STRING,
    restaurantUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      field: "restaurant_uuid",
    },
  },
  { sequelize, modelName: "meal_review" }
);

MealReview.sync();

const findAll = async () => {
  const rows = await MealReview.findAll();
  return toPlainObj(rows);
};

const findByUuid = async (uuid) => {
  return await MealReview.findByPk(uuid);
};

const create = async (mealReview) => {
  await MealReview.create(mealReview);
  console.log("Created meal review in database");
};

const deleteByUuid = async (uuid) => {
  await MealReview.destroy({ where: { uuid } });
  console.log("Removed mealReview in database");
};

const update = async (mealReview, uuid) => {
  await Customer.update(mealReview, { where: { uuid } });
  console.log("Updated meal review in database");
};

const repo = { findAll, findByUuid, create, deleteByUuid, update };

export { repo };
