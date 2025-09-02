import db from "../../connection.js";

export default async function createHints() {
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
