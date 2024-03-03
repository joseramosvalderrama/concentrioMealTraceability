import sequelize_pkg from "sequelize";
import { sequelize } from "./dbCon";

const { Model, DataTypes } = sequelize_pkg;

const Restaurant = class extends Model {};
Restaurant = Restaurant.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  },
  { sequelize, modelName: "restaurant" }
);

Restaurant.sync();

const findAll = async () => {
  const rows = await Restaurant.findAll();
  return toPlainObj(rows);
};

const findByUuid = async (uuid) => {
  return await Restaurant.findByPk(uuid);
};

const create = async (restaurant) => {
  await Restaurant.create(restaurant);
  console.log("Created restaurant in database");
};

const deleteByUuid = async (uuid) => {
  await Restaurant.destroy({ where: { uuid } });
  console.log("Removed restaurant in database");
};

const update = async (restaurant, uuid) => {
  await Customer.update(restaurant, { where: { uuid } });
  console.log("Updated restaurant in database");
};

const repo = { findAll, findByUuid, create, deleteByUuid, update };

export { repo };
