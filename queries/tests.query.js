import db from "../db/connection.js";

export async function testsQuery(id) {
  try {
    const kataTests = {
      text: `SELECT signature, input, expected FROM tests WHERE kata_id = $1`,
      value: [id],
      rowMode: "object",
    };
    return await db.query(kataTests);
  } catch (err) {
    console.log(err);
  }
}
