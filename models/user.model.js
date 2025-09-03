import pool from '../db.js';

export async function findUserByClerkId(clerkUserId) {
  const result = await pool.query('SELECT * FROM users WHERE clerk_user_id = $1', [clerkUserId]);
  return result.rows[0];
}

export async function createUser({ clerkUserId, username, avatarUrl, level,xp, isAdmin, createdAt }) {
  const result = await pool.query(
    `INSERT INTO users (clerk_user_id, username, avatar_url, level, xp, is_admin, created_at)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [clerkUserId, username, avatarUrl, level,xp, isAdmin, createdAt]
  );
  return result.rows[0];
}

export async function updateUser({ clerkUserId, username, avatarUrl, level,xp, isAdmin }) {
  const result = await pool.query(
    `UPDATE users
     SET username = $2, avatar_url = $3, level = $4, xp = $5, is_admin = $6, updated_at = NOW()
     WHERE clerk_user_id = $1
     RETURNING *`,
    [clerkUserId, username, avatarUrl, level,xp, isAdmin]
  );
  return result.rows[0];
}

export async function deleteUser(clerkUserId) {
  await pool.query('DELETE FROM users WHERE clerk_user_id = $1', [clerkUserId]);
}

export async function findUserById(id) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
}