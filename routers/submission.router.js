import express from "express";
import { postSubmission } from "../controllers/submission.controller";

const submissionRouter = express.Router();

submissionRouter.post("/submission", postSubmission);

export default submissionRouter;
