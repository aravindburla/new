import {
  addRoles,
  fetchRoles,
  googleAuth,
  login,
  register,
} from "../Controllers/user-controller";

const userRouter = require("express").Router();
const { extractJwtToken } = require("../../../Engine/Middlewares/jwthelp");

userRouter.post("/user/register", register);
userRouter.post("/user/login", login);
userRouter.post("/user/googleAuth", googleAuth);
userRouter.get("/user/roles", extractJwtToken, fetchRoles);
userRouter.post("/addroles", addRoles);


export default userRouter;
