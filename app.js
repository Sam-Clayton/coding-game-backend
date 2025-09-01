import express from "express";
import {
  handleBadRequest,
  handleCustomError,
  handleServerError,
} from "./error-handlers/index.js";
import apiRouter from "./routers/api.router.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.use(handleBadRequest);
app.use(handleCustomError);
app.use(handleServerError);

export default app;
