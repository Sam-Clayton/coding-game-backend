import db from "../../connection.js";

export default async function createTags() {
  return await db.query(
    `
    CREATE TABLE tags
    (
      tag VARCHAR(50) PRIMARY KEY
    );
    `
  );
}
