import db from "../../connection.js";
import format from "pg-format";

export async function dropTables(...tables) {
  let sql = "";
  tables.forEach((table) => (sql += `DROP TABLE IF EXISTS ${table};\n`));
  return await db.query(sql);
}

export async function insertData(table, data, ...columns) {
  const sql =
    columns.length > 0
      ? format(
          `INSERT INTO %I (%I) VALUES %L RETURNING *;`,
          table,
          columns,
          data
        )
      : format(`INSERT INTO %I VALUES %L RETURNING *;`, table, data);
  return await db.query(sql);
}
