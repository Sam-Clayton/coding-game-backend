import db from "../../connection.js";

export default async function createAchievements() {
  return await db.query(
    `
    CREATE TABLE achievements
    (
    achievement VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL
    );
    `
  );
}
