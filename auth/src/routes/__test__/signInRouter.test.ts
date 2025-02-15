/**
 * @file __tests__/signInRouter.test.ts
 *
 * This file contains test cases for the user sign-in API.
 * It verifies the expected behavior of the sign-in endpoint under different scenarios,
 * ensuring that valid requests succeed and invalid requests fail with appropriate responses.
 *
 * Test Cases:
 *  - **Successful Sign-in**: Ensures users can sign in with valid credentials.
 *  - **Invalid Requests**: Tests various incorrect payloads, such as missing fields or empty values.
 *  - **Non-Existent User**: Verifies that signing in with a non-registered username returns a 400 error.
 *  - **Wrong Credentials**: Ensures incorrect passwords return a 401 error.
 *  - **Cookie Setting**: Verifies that a cookie is set after a successful sign-in to handle session management.
 *
 * Usage:
 *  - Uses `supertest` to send HTTP requests to the sign-in endpoint.
 *  - Defines helper functions `signUp` and `signIn` to reduce code duplication.
 */

import request from "supertest";
import { app } from "../../app";

// Helper function to sign in a user and check for the expected status code
const signIn = (data: object, expectedStatus: number) =>
  request(app).post("/api/users/signIn").send(data).expect(expectedStatus);

// Helper function to sign up a user and check for the expected status code
const signUp = (data: object, expectedStatus: number) =>
  request(app).post("/api/users/signUp").send(data).expect(expectedStatus);

it("returns 200 on successful signup", async () => {
  // First, sign up a new user
  await signUp({ username: "ermis", password: "123456" }, 201);

  // Attempt to sign in with correct credentials (should succeed)
  await signIn({ username: "ermis", password: "123456" }, 200);
});

it("returns 400 on invalid request", async () => {
  // Sign up a valid user first
  await signUp({ username: "ermis", password: "123456" }, 201);

  // Test various invalid requests with missing or empty fields
  await signIn({ password: "123456" }, 400); // Missing username
  await signIn({ username: "", password: "123456" }, 400); // Empty username
  await signIn({ username: "ermis" }, 400); // Missing password
  await signIn({ username: "ermis", password: "" }, 400); // Empty password
});

it("returns 400 if username does not exist", async () => {
  // Attempt to sign in with a non-existent username (should return 400 error)
  await signIn({ username: "noUsername", password: "123456" }, 400);
});

it("returns 401 for wrong credentials", async () => {
  // First, sign up a valid user
  await signUp({ username: "ermis", password: "123456" }, 201);

  // Attempt to sign in with an incorrect password (should fail with 401 error)
  await signIn({ username: "ermis", password: "1234568" }, 401);
});

it("sets a cookie after successful sign in", async () => {
  // First, sign up a new user
  await signUp({ username: "ermis", password: "123456" }, 201);

  // Attempt to sign in with correct credentials (should succeed)
  const response = await signIn({ username: "ermis", password: "123456" }, 200);

  // Verify that the 'Set-Cookie' header is present in the response
  expect(response.get("Set-Cookie")).toBeDefined();
});
