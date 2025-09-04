import { getAuth } from "@clerk/express";
import { fetchAllUsers, fetchUserById, insertUser } from "../models/user.model.js";

export async function createUser(req, res) {
  const { userId } = getAuth(req);
  const { username, avatar_url, is_admin } = req.body;

  try {
    const user = await insertUser(userId, username, avatar_url, is_admin);
    res.status(201).send({ user });
  } catch (err) {
    console.log(err);
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function getUserById(req, res) {
  const { userId } = getAuth(req);

  try {
    const user = await fetchUserById(userId);
    res.send({ user });
  } catch (err) {
    console.log(err);
  }
}
