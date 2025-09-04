import express from "express";
import dotenv from "dotenv";
import { Webhook } from "svix";
import { createUser } from "../controllers/user.controller.js";
const __dirname = import.meta.dirname;

dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

const webhookRouter = express.Router();

webhookRouter.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;
    const headers = req.headers;

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    const wh = new Webhook(webhookSecret);

    let evt;
    try {
      evt = wh.verify(payload, headers);
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return res.status(400).send("Invalid signature");
    }

    const { type, data } = evt;

    console.log(`✅ Received Clerk webhook: ${type}`);

    if (type === "user.created") {
      try {
        await createUser(data);
      } catch (err) {
        console.error("Error handling user.created:", err);
        return res.status(500).send({ error: "Error handling users.created" });
      }
    }
    return res.send({ msg: "Webhook received" });
  }
);

export default webhookRouter;
