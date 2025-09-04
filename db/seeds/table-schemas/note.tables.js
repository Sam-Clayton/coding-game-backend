import db from "../../connection.js";

export default async function createNotes() {
  return await db.query(
    `
    CREATE TABLE notes
    (
      note_id SERIAL PRIMARY KEY,
       kata_id INT NOT NULL REFERENCES katas(kata_id),
      note TEXT NOT NULL
    );
    `
  );
}
