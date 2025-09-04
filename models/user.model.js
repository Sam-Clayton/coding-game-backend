import db from "../db/connection.js";

export async function insertUser(
  clerk_user_id,
  username,
  avatar_url,
  is_admin
) {
  const columns = ["clerk_user_id", "username"];
  const placeholders = ["$1", "$2"];
  const values = [clerk_user_id, username];
  let paramIndex = 3;

  if (avatar_url !== undefined) {
    columns.push("avatar_url");
    placeholders.push(`$${paramIndex++}`);
    values.push(avatar_url);
  }

  if (is_admin !== undefined) {
    columns.push("is_admin");
    placeholders.push(`$${paramIndex++}`);
    values.push(is_admin);
  }

  const { rows } = await db.query(
    `
    INSERT INTO users (${columns.join(", ")})
    VALUES (${placeholders.join(", ")})
    RETURNING *;
    `,
    values
  );
  return rows[0];
}

export async function fetchAllUsers() {
  const result = await db.query(
    `
    SELECT u.user_id,
           u.clerk_user_id,
           u.username,
           u.avatar_url,
           u.level,
           u.xp,
           u.is_admin,
           u.created_at,
           COUNT(ua.achievement) AS achievement
    FROM users u
    LEFT JOIN user_achievements ua
      ON u.user_id = ua.user_id
    GROUP BY u.user_id
    ORDER BY achievement DESC;
    `
  );

  return result.rows;
}

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

export async function fetchUserKatas(clerk_user_id) {
  const { rows } = await db.query(
    `
    SELECT *
    FROM user_katas
    WHERE clerk_user_id = $1;
    `
  );
}

// export async function updateUser({ clerk_user_id, username, avatar_url }) {
//   const { rows } = await pool.query(
//     `
//     UPDATE users
//     SET username = $2, avatar_url = $3
//     WHERE clerk_user_id = $1
//     RETURNING *;
//     `,
//     [clerk_user_id, username, avatar_url]
//   );
//   return rows[0];
// }

// export async function deleteUser(clerk_user_id) {
//   await db.query(
//     `
//     DELETE FROM users
//     WHERE clerk_user_id = $1
//     `,
//     [clerk_user_id]
//   );
// }
