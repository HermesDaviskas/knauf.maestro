/**
 * @file __tests__/signUpRouter.test.ts
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
 *
 */

import request from "supertest";
import { app } from "../../app";

const signUp = (data: object, expectedStatus: number) =>
  request(app).post("/api/users/signUp").send(data).expect(expectedStatus);

it("returns 201 on successful signup", async () => {
  // Valid signup with required fields only
  await signUp({ username: "ermis", password: "123456" }, 201);
  // Valid signup with optional 'isBanned' field
  await signUp(
    { username: "ermis.n", password: "123456", isBanned: true },
    201
  );
  // Valid signup with an unknown key included (should be ignored by the system)
  await signUp(
    { username: "ermis.nt", password: "123456", unknown_key: "someValue" },
    201
  );
  // Valid signup with both optional and unknown keys
  await signUp(
    {
      username: "ermis.nta",
      password: "123456",
      isBanned: true,
      unknown_key: "someValue",
    },
    201
  );
});

it("returns 400 on invalid request", async () => {
  // Invalid signup: username is too short
  await signUp({ username: "e", password: "123456" }, 400);
  // Invalid signup: 'isBanned' should be a boolean but is given as a string
  await signUp(
    { username: "ermis", password: "123456", isBanned: "notBool" },
    400
  );
  // Invalid signup: misspelled key instead of 'username'
  await signUp(
    { misspelled_key: "ermis", password: "123456", isBanned: "notBool" },
    400
  );
  // Invalid signup: missing required password field
  await signUp({ username: "ermis" }, 400);
});

it("returns 400 on non-unique username", async () => {
  // First signup with a unique username (should succeed)
  await signUp({ username: "ermis", password: "123456" }, 201);
  // Attempt to signup again with the same username (should fail with 400)
  await signUp({ username: "ermis", password: "123456", isBanned: true }, 400);
});
