import { getAuth } from "@clerk/express";
import { fetchUserById, insertUser } from "../models/userModel.js";

export async function getUserById(req, res) {
  const { userId } = getAuth(req);

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = await fetchUserById(userId);
    res.send({ user });
  } catch (err) {
    console.log(err);
  }
}

export async function createUser(req, res) {
  const { userId } = getAuth(req);
  const { username, avatar_url } = req.body;

  try {
    const user = await insertUser(userId, username, avatar_url);
    res.send({ user });
  } catch (err) {
    console.log(err);
  }
}
