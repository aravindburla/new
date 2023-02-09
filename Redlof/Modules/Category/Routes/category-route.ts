const catRouter = require("express").Router();
const { extractJwtToken } = require("../../../Engine/Middlewares/jwthelp");

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../Controllers/category-controller";

catRouter.get("/category", extractJwtToken, fetchCategories);
catRouter.post("/category/create", extractJwtToken, createCategory);
catRouter.put("/category/update/:id", extractJwtToken, updateCategory);
catRouter.delete("/category/delete/:id", extractJwtToken, deleteCategory);

export default catRouter;
