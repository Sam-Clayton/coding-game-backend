import app from "../app.js";
import db from "../db/connection.js";

export const fetchAllKatas = (tag) => {
  if (tag) {
    return db
      .query(`SELECT 1 FROM tags WHERE tag = $1;`, [tag])
      .then(({ rows: tagRows }) => {
        if (tagRows.length === 0) {
          return null;
        }
        return db
          .query(
            `
          SELECT k.kata_id, k.title, k.description, k.initial_code, 
                 k.solution_code, k.difficulty, k.created_at, kt.tag
          FROM katas k
          JOIN kata_tags kt ON k.kata_id = kt.kata_id
          WHERE kt.tag = $1;
          `,
            [tag]
          )
          .then(({ rows }) => rows);
      });
  }

  return db.query(`SELECT * FROM katas;`).then(({ rows }) => rows);
};

export const fetchKataById = (id) => {
  return db
    .query(
      `SELECT kata_id, title, description, initial_code, solution_code, difficulty, created_at
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

export function selectKataTags(kata_id) {
  return db
    .query(
      `
    SELECT ARRAY_AGG(tag) AS tags
    FROM kata_tags
    WHERE kata_id = $1
    GROUP BY kata_id;
    `,
      [kata_id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return null;
      }
      const row = result.rows[0];
      return { kata_id, tags: row.tags || [] };
    });
}

export const insertKata = ({
  title,
  description,
  initial_code,
  solution_code,
  difficulty,
}) => {
  return db
    .query(
      `
      INSERT INTO katas 
        (title, description, initial_code, solution_code, difficulty) 
      VALUES 
        ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [title, description, initial_code, solution_code, difficulty]
    )
    .then(({ rows }) => rows[0]);
};
