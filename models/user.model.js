import pool from '../db.js';

export async function findUserByClerkId(clerkUserId) {
  const result = await pool.query('SELECT * FROM users WHERE clerk_user_id = $1', [clerkUserId]);
  return result.rows[0];
}

export async function createUser({ clerkUserId, username, avatarUrl, level,xp, isAdmin, createdAt }) {
  const result = await pool.query(
    `INSERT INTO users (clerk_user_id, username, avatar_url, level, xp, is_admin, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [clerkUserId, username, avatarUrl, level,xp, isAdmin, createdAt]
  );
  return result.rows[0];
}

export async function updateUser({ clerkUserId, username, avatarUrl }) {
  const result = await pool.query(
    `UPDATE users
     SET username = $2, avatar_url = $3
     WHERE clerk_user_id = $1
     RETURNING *`,
    [clerkUserId, username, avatarUrl]
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