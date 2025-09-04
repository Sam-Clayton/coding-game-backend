import express from "express";
import { requireAuth } from "@clerk/express";
import { createUser, getUserById } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/", requireAuth(), createUser);
userRouter.get("/profile", requireAuth(), getUserById);

export default userRouter;
