import express from "express";
import { getProfile } from "../controllers/userController.js";
import { requireAuthApi } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/profile", requireAuthApi, getProfile);

export default userRouter;
