import express from "express";
import { katasRouter } from "./katas.router.js";
import { submissionRouter } from "./submission.router.js";

const apiRouter = express.Router();

apiRouter.use("/katas", katasRouter);
apiRouter.use("/submission", submissionRouter);

export default apiRouter;
