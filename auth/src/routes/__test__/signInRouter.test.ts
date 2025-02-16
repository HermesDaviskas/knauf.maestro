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

// Helper functions for user authentication actions
const signUp = (data: object, expectedStatus: number) => request(app).post("/api/users/signUp").send(data).expect(expectedStatus);

const signIn = async (data: object, expectedStatus: number) => {
  const response = await request(app).post("/api/users/signIn").send(data).expect(expectedStatus);
  return response.get("Set-Cookie");
};

describe("User Sign-In API", () => {
  /**
   * ✅ Test Case: Successful Sign-in
   *
   * This test verifies that a user can sign in with valid credentials.
   * Expected Behavior:
   *  - User signs up and provides correct credentials.
   *  - Sign-in should succeed with status 200.
   */
  it("returns 200 on successful signup", async () => {
    // Step 1: Sign up a new user
    await signUp({ username: "ermis", password: "123456" }, 201);

    // Step 2: Attempt to sign in with correct credentials (should succeed)
    await signIn({ username: "ermis", password: "123456" }, 200);
  });

  /**
   * ✅ Test Case: Cookie Setting After Successful Sign-in
   *
   * This test ensures that a cookie is set after a successful sign-in.
   * Expected Behavior:
   *  - After a successful sign-in, a 'Set-Cookie' header is returned.
   */
  it("sets a cookie after successful sign in", async () => {
    // Step 1: Sign up a new user
    await signUp({ username: "ermis", password: "123456" }, 201);

    // Step 2: Attempt to sign in with correct credentials (should succeed)
    const cookie = await signIn({ username: "ermis", password: "123456" }, 200);

    // Step 3: Verify that the 'Set-Cookie' header is present in the response
    expect(cookie).toBeDefined();
  });

  /**
   * ✅ Test Case: Invalid Requests with Missing or Empty Fields
   *
   * This test verifies that invalid sign-in requests (such as missing or empty fields)
   * return a 400 error.
   * Expected Behavior:
   *  - Missing or empty fields in the request body should result in a 400 error.
   */
  it("returns 400 on invalid request", async () => {
    // Step 1: Sign up a valid user first
    await signUp({ username: "ermis", password: "123456" }, 201);

    // Step 2: Test various invalid requests with missing or empty fields
    await signIn({ password: "123456" }, 400); // Missing username
    await signIn({ username: "", password: "123456" }, 400); // Empty username
    await signIn({ username: "ermis" }, 400); // Missing password
    await signIn({ username: "ermis", password: "" }, 400); // Empty password
  });

  /**
   * ✅ Test Case: Sign-In Attempt with Non-Existent Username
   *
   * This test checks that attempting to sign in with a non-registered username
   * results in a 400 error.
   * Expected Behavior:
   *  - Sign-in with a non-existent username should return a 400 error.
   */
  it("returns 400 if username does not exist", async () => {
    // Step 1: Attempt to sign in with a non-existent username
    await signIn({ username: "noUsername", password: "123456" }, 400);
  });

  /**
   * ✅ Test Case: Wrong Credentials Handling
   *
   * This test ensures that an incorrect password results in a 401 error.
   * Expected Behavior:
   *  - Incorrect credentials should return a 401 Unauthorized error.
   */
  it("returns 401 for wrong credentials", async () => {
    // Step 1: Sign up a valid user
    await signUp({ username: "ermis", password: "123456" }, 201);

    // Step 2: Attempt to sign in with an incorrect password (should fail with 401 error)
    await signIn({ username: "ermis", password: "1234568" }, 401);
  });
});
