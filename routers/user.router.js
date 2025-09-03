import express from "express";
import { getUserById, createUser } from "../controllers/user.controller.js";
import { requireAuthApi } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/:user_id", requireAuthApi, getUserById);
userRouter.post("/", getUserById);

export default userRouter;
