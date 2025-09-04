import app from "../app.js";
import db from "../db/connection.js";
import format from "pg-format";

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
    .query(`SELECT kata_id FROM katas WHERE kata_id = $1;`, [kata_id])
    .then((kataResult) => {
      if (!kataResult.rows.length) return null;

      return db
        .query(
          `SELECT ARRAY_AGG(tag) AS tags
       FROM kata_tags
       WHERE kata_id = $1;`,
          [kata_id]
        )
        .then((tagsResult) => {
          const tags = tagsResult.rows[0]?.tags || [];
          return { kata_id, tags };
        });
    });
}

export function selectKataHint(kata_id) {
  return db
    .query(`SELECT hint FROM hints WHERE kata_id = $1;`, [kata_id])
    .then((hintsResult) => {
      if (hintsResult.rows.length === 0) return null; 
      const hint = hintsResult.rows[0].hint;
      return { kata_id, hint };
    });
}

export function selectKataNote(kata_id) {
  return db
    .query(`SELECT note FROM notes WHERE kata_id = $1;`, [kata_id])
    .then((notesResult) => {
      if (notesResult.rows.length === 0) return null; 
      const note = notesResult.rows[0].note;
      return { kata_id, note };
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

export const insertKataTags = (kata_id, tags) => {
  if (!tags || !tags.length) return Promise.resolve();

  const tagValues = tags.map((tag) => [tag]);
  const insertTagsQuery = format(
    `INSERT INTO tags (tag) VALUES %L ON CONFLICT (tag) DO NOTHING;`,
    tagValues
  );

  const kataTagValues = tags.map((tag) => [kata_id, tag]);
  const insertKataTagsQuery = format(
    `INSERT INTO kata_tags (kata_id, tag) VALUES %L ON CONFLICT (kata_id, tag) DO NOTHING;`,
    kataTagValues
  );

  return db.query(insertTagsQuery).then(() => db.query(insertKataTagsQuery));
};

export const findKataByTitle = (title) => {
  return db
    .query("SELECT title FROM katas WHERE title = $1", [title])
    .then(({ rows }) => rows[0]);
};

export const findKataByInitialCode = (initial_code) => {
  return db
    .query("SELECT * FROM katas WHERE initial_code = $1", [initial_code])
    .then(({ rows }) => rows[0]);
};
