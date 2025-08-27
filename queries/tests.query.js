import db from "../db/connection.js";

export async function testsQuery(id) {
  try {
    const kataTests = {
      text: `SELECT input, expected FROM tests WHERE kata_id = ${id}`,
      rowMode: "array",
    };
    return await db.query(kataTests);
  } catch (err) {
    console.log(err);
  }
}
