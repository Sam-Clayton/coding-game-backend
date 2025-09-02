import db from "../../connection.js";

export default async function createTests() {
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
