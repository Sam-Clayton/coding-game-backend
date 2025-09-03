import request from "supertest";
import app from "../app.js";
import db from "../db/connection.js";
import { seed } from "../db/seeds/seed.js";
import * as data from "../db/data/test-data/index.js";

beforeEach(() => seed(data));
afterAll(() => db.end());

// DO NOT REMOVE .skip
describe.skip("POST /api/submission", () => {
  test("200: responds with 'PASS' when the submitted code passes all tests", async () => {
    const inputSubmission = {
      kata_id: 1,
      user_code: "function addNumbers(a, b) {return a + b;}",
    };
    const { body } = await request(app)
      .post("/api/submission")
      .send(inputSubmission)
      .expect(200);
    expect(body).toEqual({ result: "PASS" });
  });
  test("200: responds with 'FAIL' when the submitted code fails all tests", async () => {
    const inputSubmission = {
      kata_id: 1,
      user_code: "function addNumbers(a, b) {return 'incorrect solution';}",
    };
    const { body } = await request(app)
      .post("/api/submission")
      .send(inputSubmission)
      .expect(200);
    expect(body).toEqual({ result: "FAIL" });
  });
  test("200: responds with 'FAIL' when the submitted code fails some tests", async () => {
    const inputSubmission = {
      kata_id: 1,
      user_code: "function addNumbers(a, b) {return 5;}",
    };
    const { body } = await request(app)
      .post("/api/submission")
      .send(inputSubmission)
      .expect(200);
    expect(body).toEqual({ result: "FAIL" });
  });
  test("200: responds with an appropriate error message when the submitted code encounters a reference error", async () => {
    const inputSubmission = {
      kata_id: 1,
      user_code: "function add(a, b) {return a + b;}",
    };
    const { body } = await request(app)
      .post("/api/submission")
      .send(inputSubmission)
      .expect(200);
    expect(body).toEqual({
      result: "ReferenceError: addNumbers is not defined",
    });
  });
  test("400: responds with an appropriate error message when the kata_id is invalid", async () => {
    const inputSubmission = {
      kata_id: 9999,
      user_code: "function addNumbers(a, b) {return a + b;}",
    };
    const { body: err } = await request(app)
      .post("/api/submission")
      .send(inputSubmission)
      .expect(400);
    expect(err).toEqual({ msg: "Invalid kata_id" });
  });
  test("updates the user_katas table when the submitted code passes all tests", async () => {
    const inputSubmission = {
      kata_id: 1,
      user_code: "function addNumbers(a, b) {return a + b;}",
    };
    const { body } = await request(app)
      .post("/api/submission")
      .send(inputSubmission)
      .expect(200);
    expect(body).toEqual({ result: "PASS" });

    const { rows } = await db.query(
      `
        SELECT * FROM user_katas
        WHERE user_id = 1 
        AND kata_id = 1
        `
    );
    expect(rows.length).toBe(1);
    expect(rows[0]).toEqual(
      expect.objectContaining({
        kata_id: 1,
        completed_at: expect.any(Date),
      })
    );
  });
});
