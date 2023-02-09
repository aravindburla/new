import { Model } from "sequelize";
const { Sequelize, DataTypes } = require("sequelize");
// const Todo = require("./todo");
import Todo from "./todo";
import { sequelize } from "../Loaders/database";

// const Category = require("./category");
import Category from "./category";
import Role from "./role";

class User extends Model {}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      unique:false
    },
    // isAdmin: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true,
    //   defaultValue: false,
    // },
  },
  {
    timestamps: true,
    freezeTableName:true,
    sequelize,
    modelName: "user",
  }
);

User.hasMany(Todo, { foreignKey: "user_id" });
Todo.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Category, { foreignKey: "user_id" });
Category.belongsTo(User, { foreignKey: "user_id" });

// User.belongsToMany(Role, { through: "usertorole", foreignKey: "user_id" });
// Role.belongsToMany(User, { through: "usertorole", foreignKey: "role_id" });
// module.exports = User;
export default User;
// module.exports = {
//   User,
// };
