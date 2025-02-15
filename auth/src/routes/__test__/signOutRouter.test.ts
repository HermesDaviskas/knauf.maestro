/**
 * @file __tests__/signOutRouter.test.ts
 *
 * This file contains test cases for the user sign-out API.
 * It verifies the expected behavior of the sign-out endpoint under different scenarios,
 * ensuring that valid requests succeed and invalid requests fail with appropriate responses.
 *
 * Test Cases:
 *  - **Successful Sign-out**: Ensures users can sign out and the session is cleared.
 *  - **Not Authenticated**: Verifies that trying to sign out without being authenticated returns a 401 error.
 *  - **Session Cleared After Sign-out**: Verifies that once a user signs out, they cannot sign out again without re-authenticating.
 *
 * Usage:
 *  - Uses `supertest` to send HTTP requests to the sign-out endpoint.
 *  - Defines helper functions `signUp`, `signIn`, and `signOut` to reduce code duplication and improve readability.
 */

import request from "supertest";
import { app } from "../../app";

// Declare a variable to hold the session cookie
let cookie: string[] = [];

// Helper function to sign up a user and check for the expected status code
// This sends a POST request to sign up and checks the expected status code in the response
const signUp = (data: object, expectedStatus: number) =>
  request(app).post("/api/users/signUp").send(data).expect(expectedStatus);

// Helper function to sign in a user and check for the expected status code
// This sends a POST request to sign in, stores the session cookie in the `cookie` variable, and checks the expected status code
const signIn = async (data: object, expectedStatus: number) => {
  const response = await request(app)
    .post("/api/users/signIn")
    .send(data)
    .expect(expectedStatus);
  cookie = response.get("Set-Cookie"); // Store the cookie from the response
};

// Helper function to sign out a user and check for the expected status code
// This sends a POST request to sign out, passing the current session cookie, and checks the expected status code
const signOut = async (expectedStatus: number) => {
  const response = await request(app)
    .post("/api/users/signOut")
    .set("Cookie", cookie) // Send the current session cookie
    .expect(expectedStatus);
  cookie = response.get("Set-Cookie"); // Store the updated cookie from the response
};

it("returns 200 on successful sign-out", async () => {
  // First, sign up a new user
  await signUp({ username: "ermis", password: "123456" }, 201);

  // Sign in to authenticate the user
  await signIn({ username: "ermis", password: "123456" }, 200);

  // Attempt to sign out (should succeed and return status 200)
  await signOut(200);

  // Ensure the cookie is cleared or invalidated after sign-out
  expect(cookie.length).toBe(1); // Ensure that a cookie is returned (even if it's expired)

  // Check that the cookie has an expired date or is invalidated
  const cookieHeader = cookie[0]; // Get the cookie header
  expect(cookieHeader).toContain("expires=Thu, 01 Jan 1970 00:00:00 GMT"); // Check if the cookie is expired
});

it("returns 401 if not authenticated", async () => {
  // Attempt to sign out without being authenticated (should fail with status 401)
  await signOut(401);
});

it("returns 200 after user signs out and session is cleared", async () => {
  // First, sign up a new user
  await signUp({ username: "ermis", password: "123456" }, 201);

  // Sign in to authenticate the user
  await signIn({ username: "ermis", password: "123456" }, 200);

  // Sign out the user (should succeed)
  await signOut(200);

  // Ensure the cookie is cleared or invalidated after sign-out
  expect(cookie.length).toBe(1); // Ensure that a cookie is returned (even if it's expired)

  // Check that the cookie has an expired date or is invalidated
  const cookieHeader = cookie[0]; // Get the cookie header
  expect(cookieHeader).toContain("expires=Thu, 01 Jan 1970 00:00:00 GMT"); // Check if the cookie is expired

  // Attempt to sign out again without an active session (should fail with status 401)
  await signOut(401);
});
