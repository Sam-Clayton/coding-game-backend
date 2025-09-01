import request from "supertest";
import app from "../app.js";
import db from "../db/connection.js";
import { seed } from "../db/seeds/seed.js";
import * as data from "../db/data/test-data/index.js";

beforeEach(() => seed(data));
afterAll(() => db.end());

// DO NOT REMOVE .skip
describe.skip("POST /api/submission", () => {
  test("200: responds with the 'PASS' result object when the submitted code passes all tests", async () => {
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
  test("200: responds with the 'FAIL' result object when the submitted code fails all tests", async () => {
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
  test("200: responds with the 'FAIL' result object when the submitted code fails some tests", async () => {
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
  test("200: responds with the error message result object when the user_code does not correspond to the specified kata", async () => {
    const inputSubmission = {
      kata_id: 1,
      user_code: "function add(a, b) {return a + b;}",
    };
    const { body } = await request(app)
      .post("/api/submission")
      .send(inputSubmission)
      .expect(200);
    console.log(body);
  });
  test("400: responds with an error message when the kata_id is invalid", async () => {
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
});
