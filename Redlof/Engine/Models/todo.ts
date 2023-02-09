import { Model } from "sequelize";
import Category from "./category";
// const Category = require("./category");
// import Category from "./Category";
// import Category from "./Category.ts";

const { Sequelize, DataTypes, Deferrable } = require("sequelize");
import { sequelize } from "../Loaders/database";

class Todo extends Model {}
Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    freezeTableName:true,
    modelName: "todo",
  }
);

Category.hasMany(Todo, { foreignKey: "category_id" });
Todo.belongsTo(Category, { foreignKey: "category_id" });

export default Todo;
// module.exports = Todo;
// module.exports = Todo;
// export {}
