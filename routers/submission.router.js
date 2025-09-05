import express from "express";
import postSubmission from "../controllers/submission.controller.js";

const submissionRouter = express.Router();

submissionRouter.post("/", postSubmission);

export default submissionRouter;
