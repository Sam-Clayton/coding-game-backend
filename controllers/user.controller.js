import { getAuth } from "@clerk/express";
import {
  insertUser,
  fetchAllUsers,
  fetchUserById,
  fetchUserKatas,
} from "../models/user.model.js";

export async function createUser(data) {
  const userId = data.id;
  const username = data.username || data.email_addresses?.[0]?.email_address;
  const avatar_url = data.image_url;

  const user = await insertUser(userId, username, avatar_url);
  return user;
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

export async function getUserKatas(req, res) {
  const { userId } = getAuth(req);

  try {
    const completed = await fetchUserKatas(userId);
    res.send({ total: completed.length, completed });
  } catch (err) {
    console.log(err);
  }
}
