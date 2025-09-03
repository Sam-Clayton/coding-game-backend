import db from "../db/connection.js";

export async function fetchUserById(clerk_user_id) {
  const { rows } = await db.query(
    `
    SELECT * 
    FROM users 
    WHERE clerk_user_id = $1;
    `,
    [clerk_user_id]
  );
  return rows[0];
}

export async function insertUser({ clerk_user_id, username, avatar_url }) {
  const { rows } = await db.query(
    `
    INSERT INTO users (clerk_user_id, username, avatar_url)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [clerk_user_id, username, avatar_url]
  );
  return rows[0];
}

export async function updateUser({ clerk_user_id, username, avatar_url }) {
  const { rows } = await pool.query(
    `
    UPDATE users
    SET username = $2, avatar_url = $3
    WHERE clerk_user_id = $1
    RETURNING *;
    `,
    [clerk_user_id, username, avatar_url]
  );
  return rows[0];
}

export async function deleteUser(clerk_user_id) {
  await db.query(
    `
    DELETE FROM users 
    WHERE clerk_user_id = $1
    `,
    [clerk_user_id]
  );
}
