import request from "supertest";
import app from "../app.js";
import db from "../db/connection.js";
import { seed } from "../db/seeds/seed.js";
import * as data from "../db/data/test-data/index.js";
import endpointsJson from "../endpoints.json" with { type: "json" };
import { selectKataTags } from "../models/katas.model.js";

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/katas", () => {
  test("200: gets all katas", () => {
    return request(app)
      .get("/api/katas")
      .expect(200)
      .then(({ body }) => {
        expect(body.katas.length).toBeGreaterThan(0);
      });
  });

  test("200: response body is an object with katas array", () => {
    return request(app)
      .get("/api/katas")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("katas");
        expect(Array.isArray(body.katas)).toBe(true);
      });
  });

  test("200: each kata has the correct properties", () => {
    return request(app)
      .get("/api/katas")
      .expect(200)
      .then(({ body }) => {
        const allKatas = body.katas;
        const allowedDifficulties = ["easy", "medium", "hard"];
        allKatas.forEach((kata) => {
          expect(typeof kata.title).toBe("string");
          expect(typeof kata.description).toBe("string");
          expect(typeof kata.initial_code).toBe("string");
          expect(typeof kata.solution_code).toBe("string");
          expect(allowedDifficulties).toContain(kata.difficulty);
          expect(typeof kata.created_at).toBe("string");
        });
      });
  });
});

describe("GET /api/katas/:id", () => {
  test("Checks kata is an object with correct body", () => {
    return request(app)
      .get("/api/katas/1")
      .expect(200)
      .then((data) => {
        expect(data).toHaveProperty("body");
        expect(typeof data.body).toBe("object");
      });
  });
  test("Checks kata has correct properties with correct data types", () => {
    return request(app)
      .get("/api/katas/1")
      .expect(200)
      .then(({ body }) => {
        const kata = body.kata;
        const allowedDifficulties = ["easy", "medium", "hard"];
        expect(typeof kata.kata_id).toBe("number");
        expect(typeof kata.title).toBe("string");
        expect(typeof kata.description).toBe("string");
        expect(typeof kata.initial_code).toBe("string");
        expect(typeof kata.solution_code).toBe("string");
        expect(allowedDifficulties).toContain(kata.difficulty);
        expect(typeof kata.created_at).toBe("string");
      });
  });
  test("400: responds with an error message when a request is made for an kata_id of the wrong data type", () => {
    return request(app)
      .get("/api/katas/wrong-data-type")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("400: responds with an error when kata_id is zero", () => {
    return request(app)
      .get("/api/katas/0")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("400: responds with an error when kata_id is negative", () => {
    return request(app)
      .get("/api/katas/-5")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("404: responds with an error message when a request is made for a kata_id that is valid but not present in the database", () => {
    return request(app)
      .get("/api/katas/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Kata not found");
      });
  });
});

describe("GET /api/katas/:id/hint", () => {
  test("200: responds with an object containing kata_id and hint string", () => {
    return request(app)
      .get("/api/katas/3/hint")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("kata_id");
        expect(body).toHaveProperty("hint");
        expect(typeof body.kata_id).toBe("number");
        expect(typeof body.hint).toBe("string");
      });
  });

  test("200: responds with correct hint for a kata", () => {
    return request(app)
      .get("/api/katas/4/hint")
      .expect(200)
      .then(({ body }) => {
        expect(body.kata_id).toBe(4);
        expect(body.hint).toBe("Use Math.max with the spread operator.");
      });
  });

  test("400: responds with an error when kata_id is of the wrong data type", () => {
    return request(app)
      .get("/api/katas/not-a-number/hint")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("400: responds with an error when kata_id is zero", () => {
    return request(app)
      .get("/api/katas/0/hint")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("400: responds with an error when kata_id is negative", () => {
    return request(app)
      .get("/api/katas/-5/hint")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("404: responds with an error when kata_id is valid but not in the database", () => {
    return request(app)
      .get("/api/katas/9999/hint")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Hint not found");
      });
  });
});

describe("GET /api/katas/:id/note", () => {
  test("200: responds with an object containing kata_id and note string", () => {
    return request(app)
      .get("/api/katas/3/note")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("kata_id");
        expect(body).toHaveProperty("note");
        expect(typeof body.kata_id).toBe("number");
        expect(typeof body.note).toBe("string");
      });
  });
  test("200: responds with correct note for a kata", () => {
    return request(app)
      .get("/api/katas/4/note")
      .expect(200)
      .then(({ body }) => {
        expect(body.kata_id).toBe(4);
        expect(body.note).toBe(
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max"
        );
      });
  });
  test("400: responds with an error when kata_id is of the wrong data type", () => {
    return request(app)
      .get("/api/katas/not-a-number/note")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("400: responds with an error when kata_id is zero", () => {
    return request(app)
      .get("/api/katas/0/note")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("400: responds with an error when kata_id is negative", () => {
    return request(app)
      .get("/api/katas/-5/note")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("404: responds with an error when kata_id is valid but not in the database", () => {
    return request(app)
      .get("/api/katas/9999/note")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Note not found");
      });
  });
});

describe("GET /api/katas/:id/tags", () => {
  test("200: responds with an object containing kata_id and tags array", () => {
    return request(app)
      .get("/api/katas/1/tags")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          kata_id: 1,
          tags: expect.any(Array),
        });
        expect(body.tags).toEqual(
          expect.arrayContaining(["numbers", "functions"])
        );
      });
  });

  test("returns correct array from kata_tags", async () => {
    const result = await selectKataTags(1);
    expect(result).toEqual({
      kata_id: 1,
      tags: ["numbers", "functions"],
    });
  });

  test("200: responds with empty tags array if kata exists but has no tags", () => {
    return request(app)
      .get("/api/katas/4/tags")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({ kata_id: 4, tags: [] });
      });
  });

  test("404: responds with error if kata does not exist", () => {
    return request(app)
      .get("/api/katas/9999/tags")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Tags not found");
      });
  });

  test("400: responds with error for invalid kata_id", () => {
    return request(app)
      .get("/api/katas/not-a-number/tags")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });

  test("400: responds with error for zero or negative kata_id", async () => {
    await request(app)
      .get("/api/katas/0/tags")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });

    await request(app)
      .get("/api/katas/-5/tags")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request");
      });
  });
});

describe("GET /api/katas (tag query)", () => {
  test("200: gets katas with given tag", () => {
    return request(app)
      .get("/api/katas?tag=numbers")
      .expect(200)
      .then(({ body }) => {
        const katas = body.katas;
        expect(Array.isArray(katas)).toBe(true);
        katas.forEach((kata) => {
          expect(kata.tag).toBe("numbers");
        });
      });
  });
  test("200: returns all katas when no tag query is given", () => {
    return request(app)
      .get("/api/katas")
      .expect(200)
      .then(({ body }) => {
        const katas = body.katas;
        expect(Array.isArray(katas)).toBe(true);
        expect(katas.length).toBeGreaterThan(0);
      });
  });

  test("404: responds with error when tag does not exist", () => {
    return request(app)
      .get("/api/katas?tag=nonexistenttopic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Tag not found");
      });
  });
});

describe("POST /api/katas", () => {
  const baseKata = {
    title: "Multiply two numbers",
    description:
      "Write a function that multiplies two numbers and returns the result",
    initial_code: "function multiply(a, b) { }",
    solution_code: "function multiply(a, b) { return a * b; }",
    difficulty: "easy",
    tags: ["math"],
  };

  test("201: checks the posted kata is an object", () => {
    return request(app)
      .post("/api/katas")
      .send(baseKata)
      .expect(201)
      .then((res) => {
        expect(typeof res.body).toBe("object");
      });
  });

  test("201: checks the posted kata has correct properties", () => {
    return request(app)
      .post("/api/katas")
      .send(baseKata)
      .expect(201)
      .then((res) => {
        const { kata } = res.body;
        expect(typeof kata.kata_id).toBe("number");
        expect(typeof kata.title).toBe("string");
        expect(typeof kata.description).toBe("string");
        expect(typeof kata.initial_code).toBe("string");
        expect(typeof kata.solution_code).toBe("string");
        expect(typeof kata.difficulty).toBe("string");
        expect(typeof kata.created_at).toBe("string");
        expect(Array.isArray(kata.tags)).toBe(true);
        expect(kata.tags.length).toBeGreaterThan(0);
      });
  });

  test("201: checks the posted kata with tags inserts correctly", () => {
    const kataWithTags = { ...baseKata, tags: ["math", "arrays"] };
    let kataId;

    return request(app)
      .post("/api/katas")
      .send(kataWithTags)
      .expect(201)
      .then((res) => {
        const { kata } = res.body;
        kataId = kata.kata_id;

        return db.query("SELECT tag FROM kata_tags WHERE kata_id = $1", [
          kataId,
        ]);
      })
      .then((result) => {
        const insertedTags = result.rows.map((r) => r.tag);
        expect(insertedTags).toEqual(expect.arrayContaining(kataWithTags.tags));
      });
  });

  test("400: responds with error if fields have wrong types", () => {
    const invalidKata = { ...baseKata, difficulty: 123 };
    return request(app)
      .post("/api/katas")
      .send(invalidKata)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(
          "400 Bad Request - invalid or missing fields"
        );
      });
  });

  test("400: responds with error if tags are missing", () => {
    const invalidKata = { ...baseKata, tags: [] };
    return request(app)
      .post("/api/katas")
      .send(invalidKata)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(
          "400 Bad Request - invalid or missing fields"
        );
      });
  });

  test("409: responds with conflict if title already exists", async () => {
    const baseKataTitle = {
      title: "Reverse a String",
      description:
        "Write a function that takes a string and returns it reversed",
      initial_code: "function reverseString(str) {}",
      solution_code:
        'function reverseString(str) { return str.split("").reverse().join(""); }',
      difficulty: "medium",
      tags: ["strings"],
    };
    await request(app).post("/api/katas").send(baseKataTitle);
    return request(app)
      .post("/api/katas")
      .send(baseKataTitle)
      .expect(409)
      .then((res) => {
        expect(res.body.msg).toBe("409 Conflict - kata already exists");
      });
  });

  test("409: responds with conflict if initial_code already exists", async () => {
    const baseKataCode = {
      title: "String reverse",
      description:
        "Write a function that takes a string and returns it reversed",
      initial_code: "function reverseString(str) {}",
      solution_code:
        'function reverseString(str) { return str.split("").reverse().join(""); }',
      difficulty: "medium",
      tags: ["strings"],
    };
    await request(app).post("/api/katas").send(baseKataCode);
    return request(app)
      .post("/api/katas")
      .send(baseKataCode)
      .expect(409)
      .then((res) => {
        expect(res.body.msg).toBe("409 Conflict - code already exists");
      });
  });
});

describe("GET /api", () => {
  test("200: responds with an object detailing the documentation for each endpoint", async () => {
    const {
      body: { endpoints },
    } = await request(app).get("/api").expect(200);
    expect(endpoints).toEqual(endpointsJson);
  });
});
