import express from "express";
import { getAllKatas, getKataById } from "../controllers/katas.controller.js";

const katasRouter = express.Router();

katasRouter.get("/", getAllKatas);
katasRouter.get("/:kata_id", getKataById);

export default katasRouter;
