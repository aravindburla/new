import { Model } from "sequelize";
// import Admin from "./admin";
const { Sequelize, DataTypes } = require("sequelize");
// const { sequelize } = require("../Config");
import { sequelize } from "../Loaders/database";

class Category extends Model {}

Category.init(
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
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
  },
  {
    timestamps: true,
    freezeTableName:true,
    sequelize,
    modelName: "category",
  }
);

// module.exports = {
//   Category
// }
// module.exports = Category;
export default Category;
// export {};
