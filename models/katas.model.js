import app from "../app.js";
import db from "../db/connection.js";
import format from "pg-format";

export const fetchAllKatas = (tag) => {
  if (tag) {
    return db
      .query(`SELECT 1 FROM tags WHERE tag = $1;`, [tag])
      .then(({ rows: tagRows }) => {
        if (tagRows.length === 0) return null;
        return db.query(
          `
          SELECT k.kata_id, k.title, k.description, k.initial_code, 
                 k.solution_code, k.difficulty, k.created_at, kt.tag
          FROM katas k
          JOIN kata_tags kt ON k.kata_id = kt.kata_id
          WHERE kt.tag = $1;
          `,
          [tag]
        ).then(({ rows }) => rows);
      });
  }

  return db.query(`SELECT * FROM katas;`).then(({ rows }) => rows);
};

export const fetchKataById = (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    return Promise.reject(new Error("Invalid kata_id"));
  }

  return db
    .query(
      `SELECT kata_id, title, description, initial_code, solution_code, difficulty, created_at
       FROM katas
       WHERE kata_id = $1;`,
      [id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Kata not found" });
      }
      return rows[0];
    });
};

export function selectKataHint(kata_id) {
  if (!Number.isInteger(kata_id) || kata_id <= 0) {
    return Promise.reject(new Error("Invalid kata_id"));
  }

  return db
    .query(`SELECT hint FROM hints WHERE kata_id = $1;`, [kata_id])
    .then(({ rows }) => (rows.length ? { kata_id, hint: rows[0].hint } : null));
}

export function selectKataNote(kata_id) {
  if (!Number.isInteger(kata_id) || kata_id <= 0) {
    return Promise.reject(new Error("Invalid kata_id"));
  }

  return db
    .query(`SELECT kata_id, note FROM notes WHERE kata_id = $1;`, [kata_id])
    .then(({ rows }) => (rows.length ? { kata_id: rows[0].kata_id, note: rows[0].note } : null));
}

export function selectKataTags(kata_id) {
  if (!Number.isInteger(kata_id) || kata_id <= 0) {
    return Promise.reject(new Error("Invalid kata_id"));
  }

  return db
    .query(`SELECT kata_id FROM katas WHERE kata_id = $1;`, [kata_id])
    .then(({ rows }) => {
      if (!rows.length) return null;
      return db
        .query(`SELECT ARRAY_AGG(tag) AS tags FROM kata_tags WHERE kata_id = $1;`, [kata_id])
        .then(({ rows }) => ({ kata_id, tags: rows[0]?.tags || [] }));
    });
}

export const insertKata = ({ title, description, initial_code, solution_code, difficulty }) => {
  return db
    .query(
      `INSERT INTO katas (title, description, initial_code, solution_code, difficulty)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *;`,
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
  if (!title) return Promise.reject(new Error("Title is required"));

  return db
    .query("SELECT title FROM katas WHERE title = $1;", [title])
    .then(({ rows }) => (rows.length ? rows[0] : null));
};

export const findKataByInitialCode = (initial_code) => {
  if (!initial_code) return Promise.reject(new Error("Initial code is required"));

  return db
    .query("SELECT * FROM katas WHERE initial_code = $1;", [initial_code])
    .then(({ rows }) => (rows.length ? rows[0] : null));
};