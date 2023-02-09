import express from "express";
const router = express.Router();

import todoRouter from "./todo/Routes/todo-route";
import userRouter from "./user/Routes/user-routes";
import catRouter from "./Category/Routes/category-route";

router.use("/", todoRouter);
router.use("/", catRouter);
router.use("/", userRouter);

export default router;
