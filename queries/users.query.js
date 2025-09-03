import db from "../db/connection.js";

export async function usersQuery(clerk_user_id) {
  const { rows: user_id } = await db.query(
    `
      SELECT user_id 
      FROM users 
      WHERE clerk_user_id = $1
      `,
    [clerk_user_id]
  );
  return user_id[0];
}
