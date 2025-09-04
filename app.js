import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import { clerkMiddleware } from "@clerk/express";
import apiRouter from "./routers/api.router.js";

import {
  handleBadRequest,
  handleCustomError,
  handleServerError,
} from "./error-handlers/index.js";

const __dirname = import.meta.dirname;

const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.CLERK_PUBLISHABLE_KEY && !process.env.CLERK_SECRET_KEY)
  throw new Error("No CLERK_PUBLISHABLE_KEY or CLERK_SECRET_KEY configured");

const app = express();

app.use(cors());

app.use(express.json());

// app.use(clerkMiddleware());

app.use("/api", apiRouter);

app.use(handleBadRequest);
app.use(handleCustomError);
app.use(handleServerError);

export default app;
