import express from "express";
import { handleBadRequest, handleServerError } from "./error-handlers/index.js";

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleBadRequest);
app.use(handleServerError);

export default app;
