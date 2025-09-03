import express from "express";
import { getAllKatas, getKataById, postKata, getKataTags, getKataHint } from "../controllers/katas.controller.js";

const katasRouter = express.Router();

katasRouter.get("/", getAllKatas);
katasRouter.get("/:kata_id", getKataById);
katasRouter.get("/:kata_id/tags", getKataTags);
katasRouter.get("/:kata_id/hint", getKataHint)
katasRouter.post("/", postKata);

export default katasRouter;
