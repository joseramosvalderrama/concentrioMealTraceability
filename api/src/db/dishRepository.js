import sequelize_pkg from "sequelize";
import { sequelize } from "./dbCon.js";
import { toPlainObj } from "./util.js";

const { Model, DataTypes } = sequelize_pkg;

let Dish = class extends Model {};
Dish = Dish.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { sequelize, modelName: "dish" }
);

Dish.sync({ alter: true });

const findAll = async () => {
  const rows = await Dish.findAll();
  return toPlainObj(rows);
};

const findByUuid = async (uuid) => {
  return await Dish.findByPk(uuid);
};

const create = async (dish) => {
  try {
    const created = await Dish.create(dish);
    console.log("Created dish in database");
    return created;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteByUuid = async (uuid) => {
  await Dish.destroy({ where: { uuid } });
  console.log("Removed dish in database");
};

const update = async (dish, uuid) => {
  await Customer.update(dish, { where: { uuid } });
  console.log("Updated dish in database");
};

const repo = { findAll, findByUuid, create, deleteByUuid, update };

export { repo };
