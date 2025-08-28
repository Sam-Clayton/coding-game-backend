import db from "../db/connection.js";
import { seed } from "../db/seeds/seed.js";
import data from "../db/data/test-data/test-data/index.js";

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("seed", () => {
  describe("katas table", () => {
    test("katas table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM
                information_schema.tables
            WHERE
                table_name = 'katas'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    test("katas table has kata_id column as a serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'katas'
            AND column_name = 'kata_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("kata_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('katas_kata_id_seq'::regclass)"
          );
        });
    });
    test("katas table has kata_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'katas';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("kata_id");
        });
    });
    test("katas table has title column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'katas'
            AND column_name = 'title';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("title");
          expect(column.data_type).toBe("text");
        });
    });
    test("katas table has description column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'katas'
            AND column_name = 'description';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("description");
          expect(column.data_type).toBe("text");
        });
    });
    test("katas table has initial_code column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'katas'
            AND column_name = 'initial_code';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("initial_code");
          expect(column.data_type).toBe("text");
        });
    });
    test("katas table has solution_code column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'katas'
            AND column_name = 'solution_code';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("solution_code");
          expect(column.data_type).toBe("text");
        });
    });
    test("katas table has difficulty column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'katas'
            AND column_name = 'difficulty';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("difficulty");
          expect(column.data_type).toBe("text");
        });
    });
    test("katas table has created_at column as timestamp", () => {
      return db
        .query(
          `SELECT column_name, data_type
              FROM information_schema.columns
              WHERE table_name = 'katas'
              AND column_name = 'created_at';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("created_at");
          expect(column.data_type).toBe("timestamp without time zone");
        });
    });

    test("created_at column has default value of the current timestamp", () => {
      return db
        .query(
          `SELECT column_default
        FROM information_schema.columns
        WHERE table_name = 'katas'
        AND column_name = 'created_at';`
        )
        .then(({ rows: [{ column_default }] }) => {
          expect(column_default).toBe("CURRENT_TIMESTAMP");
        });
    });
  });
  describe("tests table", () => {
    test("tests table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM
                information_schema.tables
            WHERE
                table_name = 'tests'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    test("tests table has test_id column as a serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'tests'
            AND column_name = 'test_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("test_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('tests_test_id_seq'::regclass)"
          );
        });
    });
    test("tests table has test_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'tests';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("test_id");
        });
    });
    test("kata_id column references a kata from the katas table", () => {
      return db
        .query(
          `
        SELECT *
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = 'tests'
          AND kcu.column_name = 'kata_id'
          AND ccu.table_name = 'katas'
          AND ccu.column_name = 'kata_id';
      `
        )
        .then(({ rows }) => {
          expect(rows).toHaveLength(1);
        });
    });
    test("tests table has input column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'tests'
            AND column_name = 'input';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("input");
          expect(column.data_type).toBe("ARRAY");
        });
    });
    test("tests table has expected column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'tests'
            AND column_name = 'expected';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("expected");
          expect(column.data_type).toBe("text");
        });
    });
  });
});
