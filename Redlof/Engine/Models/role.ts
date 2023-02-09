import { Model } from "sequelize";
import User from "./user";
const { Sequelize, DataTypes } = require("sequelize");
// import Todo from "./Todo";
// import Todo from './Todo'
// import Category from "./Category";
import { sequelize } from "../Loaders/database";

// import User from "./User";
import UserToRole from "./usertorole";
class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    freezeTableName: true,
    modelName: "role",
  }
);

User.belongsToMany(Role, {
  through: { model: UserToRole },
  foreignKey: "user_id",
});
Role.belongsToMany(User, {
  through: { model: UserToRole },
  foreignKey: "role_id",
});

// module.exports = User;
export default Role;
// module.exports = {
//   Role
// }

export {};
