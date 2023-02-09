import { createTodo, deleteTodo, fetchTodoById, fetchTodos, updateTodo } from "../Controllers/todo-controller";

const todoRouter = require("express").Router();
const { extractJwtToken } = require("../../../Engine/Middlewares/jwthelp");


todoRouter.get("/todo", fetchTodos);
todoRouter.post("/createTodo/", extractJwtToken, createTodo);
todoRouter.get("/todo/:id", fetchTodoById);
todoRouter.put("/todo/update/:id", extractJwtToken, updateTodo);
todoRouter.delete("/todo/delete/:id", extractJwtToken, deleteTodo);

export default todoRouter;
