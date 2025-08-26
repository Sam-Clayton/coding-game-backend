import { getKataById } from "./controller/katas.controller.js";
import { postSubmission } from "./controller/app.controller.js";

import express from "express";

const app = express();

app.get('/katas/:id', getKataById); 

app.post('/api/submit', postSubmission)



export default app;
