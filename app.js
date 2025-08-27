import { getKataById } from "./controllers/katas.controller.js";
import { postSubmission } from "./controllers/submission.controller.js";

import express from "express";

const app = express();

// app.get('/api/katas', getAllKatas)

app.get('/api/katas/:id', getKataById); 


app.post('/api/submit', postSubmission)



export default app;
