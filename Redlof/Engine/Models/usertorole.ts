import { Model } from "sequelize";
const { Sequelize, DataTypes } = require("sequelize");
import { sequelize } from "../Loaders/database";
// const Todo = require("./todo");
// const Category = require("./category");
class UserToRole extends Model {}

UserToRole.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Role",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    sequelize,
    freezeTableName: true,
    modelName: "usertorole",
  }
);

// module.exports = User;
export default UserToRole;

// export {};

