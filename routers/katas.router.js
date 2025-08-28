import express from "express";
import { getKataById } from "../controllers/katas.controller.js";

const katasRouter = express.Router();

katasRouter.get("/:kata_id", getKataById);

export default katasRouter;
