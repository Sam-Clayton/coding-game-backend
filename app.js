import express from "express";
import {
  handleBadRequest,
  handleCustomError,
  handleServerError,
} from "./error-handlers/index.js";
import apiRouter from "./routers/api.router.js";
import cors from "cors";
import clerkMiddleware from '@clerk/express';
import webhookRouter from "./routers/webhook.router.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhookRouter);
app.use(clerkMiddleware());

app.use("/api", apiRouter);

app.use(handleBadRequest);
app.use(handleCustomError);
app.use(handleServerError);

export default app;
