import express from "express";
import { getUserById, createUser } from "../controllers/user.controller.js";
import { requireAuthApi } from "../controllers/middleware/auth.middleware.js";

console.log(requireAuthApi);

const userRouter = express.Router();

userRouter.get("/:user_id", requireAuthApi, getUserById);
userRouter.post("/", createUser);

export default userRouter;
