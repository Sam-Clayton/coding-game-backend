import express from "express";
import { getAllKatas, getKataById, postKata } from "../controllers/katas.controller.js";

const katasRouter = express.Router();

katasRouter.get("/", getAllKatas);
katasRouter.get("/:kata_id", getKataById);
katasRouter.post("/", postKata);


export default katasRouter;
