import request from "supertest";
import app from "../app.js";
import db from "../db/connection.js";
import { seed } from "../db/seeds/seed.js";
import * as data from "../db/data/test-data/index.js";

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
  test("404: responds with an error message when a request is made for a kata_id that is valid but not present in the database", () => {
    return request(app)
      .get("/api/katas/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Kata not found");
      });
  });
});

describe("POST /api/katas", () => {
  test("201: checks the posted kata is an object", () => {
    const newKata = {
      title: "Multiply two numbers",
      description:
        "Write a function that multiplies two numbers and returns the result",
      initial_code: "function multiply(a, b) { }",
      solution_code: "function multiply(a, b) { return a * b; }",
      difficulty: "easy",
    };
    return request(app)
      .post("/api/katas")
      .send(newKata)
      .expect(201)
      .then(({ body: comment }) => {
        expect(typeof comment).toBe("object");
      });
  });
  test("201: checks the posted kata has correct properties", () => {
    const newKata = {
      title: "Multiply two numbers",
      description:
        "Write a function that multiplies two numbers and returns the result",
      initial_code: "function multiply(a, b) { }",
      solution_code: "function multiply(a, b) { return a * b; }",
      difficulty: "easy",
    };
    return request(app)
      .post("/api/katas")
      .send(newKata)
      .expect(201)
      .then(({ body: { kata } }) => {
        expect(typeof kata.kata_id).toBe("number");
        expect(typeof kata.title).toBe("string");
        expect(typeof kata.description).toBe("string");
        expect(typeof kata.initial_code).toBe("string");
        expect(typeof kata.solution_code).toBe("string");
        expect(typeof kata.difficulty).toBe("string");
        expect(typeof kata.created_at).toBe("string");
      });
  });
  test("201: checks the total number of katas had gone up by 1", async () => {
    const newKata = {
      title: "Multiply two numbers",
      description:
        "Write a function that multiplies two numbers and returns the result",
      initial_code: "function multiply(a, b) { }",
      solution_code: "function multiply(a, b) { return a * b; }",
      difficulty: "easy",
    };

    const { rows: beforeRows } = await db.query(`SELECT * FROM katas;`);
    const beforeCount = beforeRows.length;

    await request(app).post("/api/katas").send(newKata).expect(201);

    const { rows: AfterRows } = await db.query(`SELECT * FROM katas;`);
    const AfterCount = AfterRows.length;

    expect(AfterCount - beforeCount).toBe(1);
  });
  test("400: responds with an error message when a request does not include all the required keys", () => {
    const newKata = {
      title: "Multiply two numbers",
      description: "",
      initial_code: "function multiply(a, b) { }",
      solution_code: "function multiply(a, b) { return a * b; }",
      difficulty: "",
    };
    return request(app)
      .post("/api/katas")
      .send(newKata)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 Bad Request - invalid or missing fields");
      });
  });
});

describe("POST /api/submission", () => {
  test.skip("201: responds with an object containing the result of the assertions", () => {
    const inputSubmission = {
      kata_id: 1,
      user_code: "function addNumbers(a, b) {return a + b;}",
    };
    return request(app)
      .post("/api/submission")
      .send(inputSubmission)
      .expect(201)
      .then(({ body }) => {
        expect(body.output).toEqual("PASS\n");
      });
  });
});
