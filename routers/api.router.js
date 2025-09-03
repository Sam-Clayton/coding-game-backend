import express from "express";
import getApi from "../controllers/api.controller.js";
import katasRouter from "./katas.router.js";
import submissionRouter from "./submission.router.js";
import userRouter from "./user.router.js";

const apiRouter = express.Router();

apiRouter.get("/", getApi);
apiRouter.get("/profile", userRouter);
apiRouter.use("/katas", katasRouter);
apiRouter.use("/submission", submissionRouter);

export default apiRouter;
