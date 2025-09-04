import express from "express";
import { requireAuth } from "@clerk/express";
import postSubmission from "../controllers/submission.controller.js";

const submissionRouter = express.Router();

submissionRouter.post("/", requireAuth(), postSubmission);

export default submissionRouter;
