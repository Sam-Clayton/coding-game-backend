import db from "../connection.js";
import format from "pg-format";

export async function dropTables(...tables) {
  let sql = "";
  tables.forEach((table) => (sql += `DROP TABLE IF EXISTS ${table};\n`));
  return await db.query(sql);
}

export async function insertData(table, data, ...columns) {
  const sql =
    columns.length > 0
      ? format(
          `INSERT INTO %I (%I) VALUES %L RETURNING *;`,
          table,
          columns,
          data
        )
      : format(`INSERT INTO %I VALUES %L RETURNING *;`, table, data);
  return await db.query(sql);
}

export async function createHints() {
  return await db.query(
    `
    CREATE TABLE hints
    (
      hint_id SERIAL PRIMARY KEY,
      kata_id INT NOT NULL REFERENCES katas(kata_id),
      hint TEXT NOT NULL
    );
    `
  );
}

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

export async function createNotes() {
  return await db.query(
    `
    CREATE TABLE notes
    (
      note_id SERIAL PRIMARY KEY,
      note_text TEXT NOT NULL
    );
    `
  );
}

export async function createTags() {
  return await db.query(
    `
    CREATE TABLE tags
    (
      tag VARCHAR(50) PRIMARY KEY
    );
    `
  );
}

export async function createTests() {
  return await db.query(
    `
    CREATE TABLE tests
    (
      test_id SERIAL PRIMARY KEY,
      kata_id INT NOT NULL REFERENCES katas(kata_id),
      signature TEXT NOT NULL,
      input TEXT,
      expected TEXT NOT NULL
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
