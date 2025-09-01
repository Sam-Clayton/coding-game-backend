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
          expect(typeof kata.signature).toBe("string");
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
        expect(typeof data).toBe("object");
      });
  });
  test("Checks kata has correct properties with correct data types", () => {
    return request(app)
      .get("/api/katas/1")
      .expect(200)
      .then((data) => {
        const kata = data.body;
        const allowedDifficulties = ["easy", "medium", "hard"];
        expect(kata.kata_id).toBe(1);
        expect(typeof kata.title).toBe("string");
        expect(typeof kata.description).toBe("string");
        expect(typeof kata.signature).toBe("string");
        expect(typeof kata.initial_code).toBe("string");
        expect(typeof kata.solution_code).toBe("string");
        expect(allowedDifficulties).toContain(kata.difficulty);
        expect(typeof kata.created_at).toBe("string");
      });
  });
});
