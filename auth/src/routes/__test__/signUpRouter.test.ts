/**
 * @file routes/__tests__/signUpRouter.test.ts
 *
 * This file contains test cases for the user signup API.
 * It verifies the expected behavior of the signup endpoint under different scenarios,
 * ensuring that valid requests succeed and invalid requests fail with appropriate responses.
 *
 * Test Cases:
 *  - **Successful Signup**: Ensures users can sign up with valid credentials, with or without optional fields.
 *  - **Invalid Requests**: Tests various incorrect payloads, such as missing fields, invalid data types, or unknown keys.
 *  - **Non-Unique Username**: Verifies that signing up with an already registered username returns a 400 error.
 *
 * Usage:
 *  - Uses `supertest` to send HTTP requests to the signup endpoint.
 *  - Defines a helper function `signUp` to reduce code duplication.
 */

import request from "supertest";
import { app } from "../../app";

// Helper function to send the signup request and expect a specific status code in the response
const signUp = (data: object, expectedStatus: number) => request(app).post("/api/users/signUp").send(data).expect(expectedStatus);

describe("User Signup API", () => {
  /**
   * ✅ Test Case: Successful Signup
   *
   * This test ensures that users can successfully sign up with valid credentials.
   * It covers cases where required fields are provided, optional fields are included,
   * and unknown keys are ignored by the system.
   * Expected Behavior:
   *  - Successful sign-up should return a 201 status code regardless of optional or unknown fields.
   */
  it("returns 201 on successful signup", async () => {
    // Step 1: Valid signup with required fields only
    await signUp({ username: "ermis", password: "123456" }, 201);

    // Step 2: Valid signup with optional 'isBanned' field
    await signUp({ username: "ermis.n", password: "123456", isBanned: true }, 201);

    // Step 3: Valid signup with an unknown key (should be ignored by the system)
    await signUp({ username: "ermis.nt", password: "123456", unknown_key: "someValue" }, 201);

    // Step 4: Valid signup with both optional and unknown keys
    await signUp({ username: "ermis.nta", password: "123456", isBanned: true, unknown_key: "someValue" }, 201);
  });

  /**
   * ✅ Test Case: Invalid Request Handling
   *
   * This test verifies that invalid requests (such as incorrect field values or missing fields)
   * return a 400 error.
   * Expected Behavior:
   *  - Requests with invalid data should result in a 400 error.
   */
  it("returns 400 on invalid request", async () => {
    // Step 1: Invalid signup with a username that is too short (less than the minimum length)
    await signUp({ username: "e", password: "123456" }, 400);

    // Step 2: Invalid signup with 'isBanned' as a non-boolean value (should be a boolean)
    await signUp({ username: "ermis", password: "123456", isBanned: "notBool" }, 400);

    // Step 3: Invalid signup with a misspelled key instead of 'username'
    await signUp({ misspelled_key: "ermis", password: "123456", isBanned: "notBool" }, 400);

    // Step 4: Invalid signup with missing required password field
    await signUp({ username: "ermis" }, 400);
  });

  /**
   * ✅ Test Case: Non-Unique Username Handling
   *
   * This test ensures that the API returns a 400 error when trying to sign up with a username
   * that already exists in the system.
   * Expected Behavior:
   *  - Attempting to sign up with a non-unique username should result in a 400 error.
   */
  it("returns 400 on non-unique username", async () => {
    // Step 1: First, sign up with a unique username (should succeed)
    await signUp({ username: "ermis", password: "123456" }, 201);

    // Step 2: Attempt to sign up again with the same username (should fail with a 400 error)
    await signUp({ username: "ermis", password: "123456", isBanned: true }, 400);
  });
});
