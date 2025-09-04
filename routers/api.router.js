import express from "express";
import getApi from "../controllers/api.controller.js";
import katasRouter from "./katas.router.js";
import submissionRouter from "./submission.router.js";
import usersRouter from "./user.router.js";

const apiRouter = express.Router();

apiRouter.get("/", getApi);
apiRouter.use("/katas", katasRouter);
apiRouter.use("/submission", submissionRouter);
apiRouter.use("/users", usersRouter);

export default apiRouter;
