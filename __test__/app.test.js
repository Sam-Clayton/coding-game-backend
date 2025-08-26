import request from "supertest";
import app from "../app.js";

describe("Getting katas", () => {
  test("Checks kata is an object with correct body", () => {
    return request(app)
      .get("/katas/1")
      .expect(200)
      .then((data) => {
        expect(data).toHaveProperty("body");
        expect(typeof data).toBe("object");
      });
  });
  test("Checks kata has correct properties with correct data types", () => {
    return request(app)
      .get("/katas/1")
      .expect(200)
      .then((data) => {
        const question = data.body;
        expect(question.id).toBe(1);
        expect(typeof question.title).toBe("string");
        expect(typeof question.description).toBe("string");
        expect(typeof question.question).toBe("string");
      });
  });
});
