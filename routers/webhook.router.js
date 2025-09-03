import express from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { createUser, updateUser, deleteUser } from "../models/user.model.js";

const webhookRouter = express.Router();

webhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;

    try {
      event = await verifyWebhook(req, {
        secret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
      });
    } catch (err) {
      console.error("[Clerk Webhook] Signature verification failed:", err);
      return res.status(400).send("Invalid signature");
    }

    const { type, data } = event;

    try {
      switch (type) {
        case "user.created":
          await createUser({
            clerkUserId: data.id,
            username: data.username || null,
            avatarUrl: data.imageUrl || null,
            level: data.publicMetadata?.level || 1,
            xp: data.publicMetadata?.xp || 0,
            isAdmin: data.publicMetadata?.isAdmin || false,
            createdAt: data.createdAt || new Date().toISOString(),
          });
          break;

        case "user.updated":
          await updateUser({
            clerkUserId: data.id,
            username: data.username || null,
            avatarUrl: data.imageUrl || null,
            createdAt: data.createdAt || new Date().toISOString(),
          });
          break;

        case "user.deleted":
          await deleteUser(data.id);
          break;

        default:
          console.log("[Clerk Webhook] Unhandled event type:", type);
      }

      res.status(200).send("OK");
    } catch (err) {
      console.error("[Clerk Webhook] DB error:", err);
      res.status(500).send("Webhook handling failed");
    }
  }
);

export default webhookRouter;
