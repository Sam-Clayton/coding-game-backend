import db from "../../connection.js";

export async function createKatas() {
  return await db.query(
    `
    CREATE TABLE katas 
    (
      kata_id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      initial_code TEXT NOT NULL,
      solution_code TEXT NOT NULL,
      difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
  );
}

export async function createKataTags() {
  return await db.query(
    `
    CREATE TABLE kata_tags
    (
      kata_id INT REFERENCES katas(kata_id) ON DELETE CASCADE,
      tag TEXT REFERENCES tags(tag) ON DELETE CASCADE,
      PRIMARY KEY (kata_id, tag)
    );
    `
  );
}
