import express from "express";
import {
  getLogin,
  postLogin,
  getRegister,
  postResister,
  logout,
} from "../controllers/userController.js";
import { errorMiddleware } from "../middleware.js";

const userRouter = express.Router();

userRouter.route("/").get(getLogin).post(postLogin);

userRouter.route("/register").get(getRegister).post(postResister);

userRouter.route("/logout").get(logout);

export default userRouter;
