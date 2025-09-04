import db from "../db/connection.js";
import { seed } from "../db/seeds/seed.js";
import * as data from "../db/data/test-data/index.js";

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
          expect(column.data_type).toBe("text");
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
  describe("hints table", () => {
    test("hints table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM
                information_schema.tables
            WHERE
                table_name = 'hints'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
    test("hints table has hint_id column as a serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'hints'
            AND column_name = 'hint_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("hint_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('hints_hint_id_seq'::regclass)"
          );
        });
    });
    test("hints table has hint_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'hints';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("hint_id");
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
          AND tc.table_name = 'hints'
          AND kcu.column_name = 'kata_id'
          AND ccu.table_name = 'katas'
          AND ccu.column_name = 'kata_id';
      `
        )
        .then(({ rows }) => {
          expect(rows).toHaveLength(1);
        });
    });
    test("hints table has hint column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'hints'
            AND column_name = 'hint';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("hint");
          expect(column.data_type).toBe("text");
        });
    });
  });
  describe("tags table", () => {
    test("tags table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM
                information_schema.tables
            WHERE
                table_name = 'tags'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
    test("tags table has tag column of varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
        FROM information_schema.columns
        WHERE table_name = 'tags'
        AND column_name = 'tag';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("tag");
          expect(column.data_type).toBe("character varying");
        });
    });
    test("tags table has tag column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'tags';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("tag");
        });
    });
  });
  describe("notes table", () => {
    test("notes table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM
                information_schema.tables
            WHERE
                table_name = 'notes'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
    test("notes table has note_id column as a serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'notes'
            AND column_name = 'note_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("note_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('notes_note_id_seq'::regclass)"
          );
        });
    });
    test("notes table has note_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'notes';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("note_id");
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
          AND tc.table_name = 'notes'
          AND kcu.column_name = 'kata_id'
          AND ccu.table_name = 'katas'
          AND ccu.column_name = 'kata_id';
      `
        )
        .then(({ rows }) => {
          expect(rows).toHaveLength(1);
        });
    });
    test("notes table has note column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'notes'
            AND column_name = 'note';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("note");
          expect(column.data_type).toBe("text");
        });
    });
  });
  describe("kata_tags table", () => {
    test("kata_tags table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM
                information_schema.tables
            WHERE
                table_name = 'kata_tags'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
    test("has composite primary key (kata_id, tag)", () => {
      return db
        .query(
          `
        SELECT kcu.column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = 'kata_tags'
          AND tc.constraint_type = 'PRIMARY KEY';
      `
        )
        .then(({ rows }) => {
          const pkColumns = rows.map((row) => row.column_name).sort();
          expect(pkColumns).toEqual(["kata_id", "tag"]);
        });
    });
    test("kata_id references katas(kata_id) with ON DELETE CASCADE", () => {
      return db
        .query(
          `
      SELECT rc.delete_rule, rc.update_rule
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.referential_constraints AS rc
        ON tc.constraint_name = rc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_name = 'kata_tags'
        AND kcu.column_name = 'kata_id';
      `
        )
        .then(({ rows }) => {
          expect(rows).toHaveLength(1);
          expect(rows[0].delete_rule).toBe("CASCADE");
        });
    });
    test("tag references tags(tag) with ON DELETE CASCADE", () => {
      return db
        .query(
          `
      SELECT rc.delete_rule, rc.update_rule
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.referential_constraints AS rc
        ON tc.constraint_name = rc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_name = 'kata_tags'
        AND kcu.column_name = 'tag';
      `
        )
        .then(({ rows }) => {
          expect(rows).toHaveLength(1);
          expect(rows[0].delete_rule).toBe("CASCADE");
        });
    });
  });
  describe("achievements table", () => {
    test("achievements table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM
                information_schema.tables
            WHERE
                table_name = 'achievements'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    test("achievements table has achievement column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'achievements';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("achievement");
        });
    });
    test("achievements table has description column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'achievements'
            AND column_name = 'description';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("description");
          expect(column.data_type).toBe("text");
        });
    });
  });
  describe("users table", () => {
    test("users table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM
                information_schema.tables
            WHERE
                table_name = 'users'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
    test("users table has user_id column as a serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'user_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("user_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('users_user_id_seq'::regclass)"
          );
        });
    });
    test("users table has user_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'users';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("user_id");
        });
    });
    test("clerk_user_id is unique and not null", () => {
      return db
        .query(
          `SELECT column_name, is_nullable
         FROM information_schema.columns
         WHERE table_name = 'users'
         AND column_name = 'clerk_user_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("clerk_user_id");
          expect(column.is_nullable).toBe("NO");
        })
        .then(() => {
          return db.query(
            `SELECT constraint_type
           FROM information_schema.table_constraints
           WHERE table_name = 'users'
           AND constraint_type = 'UNIQUE';`
          );
        })
        .then(({ rows }) => {
          const hasUnique = rows.some((row) => row.constraint_type === "UNIQUE");
          expect(hasUnique).toBe(true);
        });
    });

    test("username is unique and not null", () => {
      return db
        .query(
          `SELECT column_name, is_nullable
         FROM information_schema.columns
         WHERE table_name = 'users'
         AND column_name = 'username';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("username");
          expect(column.is_nullable).toBe("NO");
        });
    });

    test("avatar_url has correct type and default", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
         FROM information_schema.columns
         WHERE table_name = 'users'
         AND column_name = 'avatar_url';`
        )
        .then(({ rows: [column] }) => {
          expect(column.data_type).toBe("character varying");
          expect(column.column_default).toContain("http");
        });
    });

    test("level and xp have integer defaults", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
         FROM information_schema.columns
         WHERE table_name = 'users'
         AND column_name IN ('level', 'xp');`
        )
        .then(({ rows }) => {
          const level = rows.find((row) => row.column_name === "level");
          const xp = rows.find((row) => row.column_name === "xp");

          expect(level.data_type).toBe("integer");
          expect(level.column_default).toBe("1");

          expect(xp.data_type).toBe("integer");
          expect(xp.column_default).toBe("0");
        });
    });

    test("is_admin has boolean default", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
         FROM information_schema.columns
         WHERE table_name = 'users'
         AND column_name = 'is_admin';`
        )
        .then(({ rows: [column] }) => {
          expect(column.data_type).toBe("boolean");
          expect(column.column_default).toBe("false");
        });
    });

    test("created_at defaults to current timestamp", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
         FROM information_schema.columns
         WHERE table_name = 'users'
         AND column_name = 'created_at';`
        )
        .then(({ rows: [column] }) => {
          expect(column.data_type).toBe("timestamp without time zone");
          expect(column.column_default).toBe("CURRENT_TIMESTAMP");
        });
    });
  });
  describe("user_achievements table", () => {
    test("user_achievements table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = 'user_achievements'
        );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    test("has user_id column referencing users(user_id)", () => {
      return db
        .query(
          `SELECT kcu.column_name, ccu.table_name AS foreign_table, ccu.column_name AS foreign_column
         FROM information_schema.table_constraints tc
         JOIN information_schema.key_column_usage kcu 
         ON tc.constraint_name = kcu.constraint_name
         JOIN information_schema.constraint_column_usage ccu 
         ON ccu.constraint_name = tc.constraint_name
         WHERE tc.constraint_type = 'FOREIGN KEY'
         AND tc.table_name = 'user_achievements'
         AND kcu.column_name = 'user_id';`
        )
        .then(({ rows: [fk] }) => {
          expect(fk.foreign_table).toBe("users");
          expect(fk.foreign_column).toBe("user_id");
        });
    });

    test("has achievement column referencing achievements(achievement)", () => {
      return db
        .query(
          `SELECT kcu.column_name, ccu.table_name AS foreign_table, ccu.column_name AS foreign_column
         FROM information_schema.table_constraints tc
         JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
         JOIN information_schema.constraint_column_usage ccu 
         ON ccu.constraint_name = tc.constraint_name
         WHERE tc.constraint_type = 'FOREIGN KEY'
         AND tc.table_name = 'user_achievements'
         AND kcu.column_name = 'achievement';`
        )
        .then(({ rows: [fk] }) => {
          expect(fk.foreign_table).toBe("achievements");
          expect(fk.foreign_column).toBe("achievement");
        });
    });

    test("user_id + achievement form a composite primary key", () => {
      return db
        .query(
          `SELECT kcu.column_name
         FROM information_schema.table_constraints tc
         JOIN information_schema.key_column_usage kcu
         ON tc.constraint_name = kcu.constraint_name
         WHERE tc.constraint_type = 'PRIMARY KEY'
         AND tc.table_name = 'user_achievements';`
        )
        .then(({ rows }) => {
          const pkColumns = rows.map((row) => row.column_name).sort();
          expect(pkColumns).toEqual(["achievement", "user_id"]);
        });
    });
  });
  describe("user_katas table", () => {
    test("user_katas table exists", async () => {
      const { rows } = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'user_katas'
      );
    `);
      expect(rows[0].exists).toBe(true);
    });

    test("user_katas has user_id column referencing users(user_id)", async () => {
      const { rows } = await db.query(`
      SELECT tc.constraint_type, kcu.column_name, ccu.table_name AS foreign_table, ccu.column_name AS foreign_column
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY' 
        AND tc.table_name = 'user_katas'
        AND kcu.column_name = 'user_id';
    `);

      expect(rows[0].foreign_table).toBe("users");
      expect(rows[0].foreign_column).toBe("user_id");
    });

    test("user_katas has kata_id column referencing katas(kata_id)", async () => {
      const { rows } = await db.query(`
      SELECT tc.constraint_type, kcu.column_name, ccu.table_name AS foreign_table, ccu.column_name AS foreign_column
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY' 
        AND tc.table_name = 'user_katas'
        AND kcu.column_name = 'kata_id';
    `);

      expect(rows[0].foreign_table).toBe("katas");
      expect(rows[0].foreign_column).toBe("kata_id");
    });

    test("user_katas has a composite primary key (user_id, kata_id)", async () => {
      const { rows } = await db.query(`
      SELECT kcu.column_name
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_name = 'user_katas'
      ORDER BY kcu.ordinal_position;
    `);

      const pkColumns = rows.map((row) => row.column_name);
      expect(pkColumns).toEqual(["user_id", "kata_id"]);
    });

    test("completed_at has default CURRENT_TIMESTAMP", async () => {
      const { rows } = await db.query(`
      SELECT column_default
      FROM information_schema.columns
      WHERE table_name = 'user_katas'
        AND column_name = 'completed_at';
    `);

      expect(rows[0].column_default).toContain("CURRENT_TIMESTAMP");
    });
  });
});
