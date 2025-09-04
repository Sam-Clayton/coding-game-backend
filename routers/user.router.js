import express from "express";
import { requireAuth } from "@clerk/express";
import {
  getAllUsers,
  createUser,
  getUserById,
  getUserKatas,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/", requireAuth(), createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/profile", requireAuth(), getUserById);
userRouter.get("/profile/completed", requireAuth(), getUserKatas);

export default userRouter;
