import express from "express";
import katasRouter from "./katas.router.js";
import submissionRouter from "./submission.router.js";
import getApi from "../controllers/api.controller.js";

const apiRouter = express.Router();

apiRouter.get("/", getApi);
apiRouter.use("/katas", katasRouter);
apiRouter.use("/submission", submissionRouter);

export default apiRouter;
