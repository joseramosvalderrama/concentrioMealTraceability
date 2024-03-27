import sequelize_pkg from "sequelize";
import { sequelize } from "./dbCon.js";
import { toPlainObj } from "./util.js";

const { Model, DataTypes } = sequelize_pkg;

let Score = class extends Model {};
Score = Score.init(
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
    dishUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      field: "dish_uuid",
    },
    userUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      field: "user_uuid",
    },
  },
  { sequelize, modelName: "score" }
);

Score.sync({ alter: true });

const findAll = async () => {
  const rows = await Score.findAll();
  return toPlainObj(rows);
};

const findByUuid = async (uuid) => {
  return await Score.findByPk(uuid);
};

const create = async (score) => {
  await Score.create(score);
  console.log("Created score review in database");
};

const deleteByUuid = async (uuid) => {
  await Score.destroy({ where: { uuid } });
  console.log("Removed score in database");
};

const update = async (score, uuid) => {
  await Customer.update(score, { where: { uuid } });
  console.log("Updated score review in database");
};

const repo = { findAll, findByUuid, create, deleteByUuid, update };

export { repo };
