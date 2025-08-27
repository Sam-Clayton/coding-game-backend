import request from "supertest";
import app from "../app.js";

describe("GET /api/katas", () => {
  test("200: gets all katas", () => {
    return request(app)
      .get("/api/katas")
      .expect(200)
      .then(({ body }) => {
        expect(body.katas.length).toBeGreaterThan(0);
      });
  });
  test("200: katas is an object", () => {
    return request(app)
      .get("/api/katas")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("katas");
        expect(typeof body).toBe("object");
      });
  });
  test("200: checks each kata has the correct properties", () => {
    return request(app)
      .get("/api/katas")
      .expect(200)
      .then(({ body }) => {
        const allKatas = body.katas;
        allKatas.forEach((kata) => {
          expect(typeof kata).toBe("object");
          expect(typeof kata.id).toBe(1);
          expect(typeof kata.title).toBe("string");
          expect(typeof kata.description).toBe("string");
          expect(typeof kata.question).toBe("string");
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
        expect(kata.id).toBe(1);
        expect(typeof kata.title).toBe("string");
        expect(typeof kata.description).toBe("string");
        expect(typeof kata.question).toBe("string");
      });
  });
});
