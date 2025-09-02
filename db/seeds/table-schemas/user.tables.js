import db from "../../connection.js";

export async function createUsers() {
  return await db.query(
    `
    CREATE TABLE users
    (
      user_id SERIAL PRIMARY KEY,
      clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(50) UNIQUE NOT NULL,
      avatar_url VARCHAR(1000),
      level INT DEFAULT 1,
      xp INT default 0,
      is_admin BOOL NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
  );
}

export async function createUserAchievements() {
  return await db.query(
    `
    CREATE TABLE user_achievements
    (
      user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
      achievement TEXT REFERENCES achievements(achievement) ON DELETE CASCADE,
      PRIMARY KEY (user_id, achievement)
    );
    `
  );
}

export async function createUserKatas() {
  return await db.query(
    `
    CREATE TABLE user_katas
    (
      user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
      kata_id TEXT REFERENCES achievements(achievement) ON DELETE CASCADE,
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, kata_id)
    );
    `
  );
}
