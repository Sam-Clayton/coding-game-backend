import db from "../../connection.js";

export default async function createNotes() {
  return await db.query(
    `
    CREATE TABLE notes
    (
      note_id SERIAL PRIMARY KEY,
      note TEXT NOT NULL
    );
    `
  );
}
