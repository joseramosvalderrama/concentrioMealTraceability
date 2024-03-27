import sequelize_pkg from "sequelize";
import { sequelize } from "./dbCon.js";
import { toPlainObj } from "./util.js";

const { Model, DataTypes } = sequelize_pkg;

let User = class extends Model {};
User = User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);

User.sync();

const findAll = async () => {
  const rows = await User.findAll();
  return toPlainObj(rows);
};

const findByUuid = async (uuid) => {
  return await User.findByPk(uuid);
};

const findByUserName = async (username) => {
  const row = await User.findOne({ username });
  return toPlainObj(row);
};

const create = async (user) => {
  try {
    const created = await User.create(user);
    return toPlainObj(created);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteByUuid = async (uuid) => {
  await User.destroy({ where: { uuid } });
};

const repo = { findAll, findByUuid, findByUserName, create, deleteByUuid };

export { repo };
