const { postSubmission } = require('./controller/app.controller')

import express from "express";

const app = express();

app.post('/api/submit', postSubmission)

export default app;
