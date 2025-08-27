import { getKataById } from "./controllers/katas.controller.js";
import { postSubmission } from "./controllers/submission.controller.js";

import express from "express";

const app = express();

app.get("/katas/:id", getKataById);
app.post("/api/submission", postSubmission);

export default app;
