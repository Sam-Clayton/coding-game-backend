import express from "express";
import { handleBadRequest } from "./error-handlers/handleBadRequest.js";
import { handleServerError } from "./error-handlers/handleServerError.js";
import apiRouter from "./routers/api.router.js";

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleBadRequest);
app.use(handleServerError);

export default app;
