import request from "supertest";
import testApp from "./auth-testing.app.js";
import { insertUser, fetchUserById } from "../models/user.model.js";
import db from "../db/connection.js";
import { seed } from "../db/seeds/seed.js";
import * as data from "../db/data/test-data/index.js";

const TEST_USER_TOKEN = "test_user_123";
const INVALID_TOKEN = "invalid_token_12345";
const NON_EXISTENT_USER_TOKEN = "non_existent_user_123";

beforeEach(async () => {
  await seed(data);
  
  await insertUser(TEST_USER_TOKEN, "tester", "https://example.com/avatar.png");
});

afterAll(async () => {
  await db.end();
});

describe("User Authentication Tests", () => {
  describe("GET /api/users/profile", () => {
    test("302: redirects when no authorization token provided", async () => {
      const res = await request(testApp)
        .get("/api/users/profile")
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(302);
    });

    test("401: returns unauthorized error for invalid token format", async () => {
      const res = await request(testApp)
        .get("/api/users/profile")
        .set("Authorization", "InvalidFormat")
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("error");
    });

    test("401: returns unauthorized error for invalid token", async () => {
      const res = await request(testApp)
        .get("/api/users/profile")
        .set("Authorization", "Bearer totally.invalid.token")
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toMatch(/unauthorized/i);
    });

    test("404: returns not found for non-existent user", async () => {
      const res = await request(testApp)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${NON_EXISTENT_USER_TOKEN}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(404);
    });

    test("200: returns user profile for valid token", async () => {
      const res = await request(testApp)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${TEST_USER_TOKEN}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user.clerk_user_id).toBe(TEST_USER_TOKEN);
    });
  });

  describe("POST /api/users", () => {
    test("401: rejects request without authorization header", async () => {
      const res = await request(testApp)
        .post("/api/users")
        .set("Accept", "application/json")
        .send({
          username: "newuser",
          avatar_url: "https://avatar.url/image.png",
        });

      expect(res.statusCode).toBe(401);
    });

    test("401: rejects request with invalid token", async () => {
      const res = await request(testApp)
        .post("/api/users")
        .set("Authorization", `Bearer ${INVALID_TOKEN}`)
        .set("Accept", "application/json")
        .send({
          username: "newuser",
          avatar_url: "https://avatar.url/image.png",
        });

      expect(res.statusCode).toBe(401);
    });

    test("201: creates new user with valid data", async () => {
      const newUsername = `newuser_${Date.now()}`;
      const avatarUrl = "https://avatar.url/new-image.png";

      const res = await request(testApp)
        .post("/api/users")
        .set("Authorization", `Bearer ${TEST_USER_TOKEN}`)
        .set("Accept", "application/json")
        .send({
          username: newUsername,
          avatar_url: avatarUrl,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user.username).toBe(newUsername);
      
      // Verify database entry
      const dbUser = await fetchUserById(TEST_USER_TOKEN);
      expect(dbUser.username).toBe(newUsername);
    });
  });
});