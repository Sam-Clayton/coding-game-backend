import app from "../app.js";
import db from "../db/connection.js";

export const fetchAllKatas = () => {
  return db
    .query(
      `
    SELECT title, description, signature, initial_code, solution_code, difficulty, created_at 
    FROM katas
  `
    )
    .then(({ rows }) => rows);
};

export const fetchKataById = (id) => {
  return db
    .query(
      `SELECT kata_id, title, signature, description, initial_code, solution_code, difficulty, created_at
     FROM katas
     WHERE kata_id = $1;`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Kata not found" });
      }
      return rows[0];
    });
};
