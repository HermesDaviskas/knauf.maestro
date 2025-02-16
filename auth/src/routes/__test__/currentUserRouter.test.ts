/**
 * @file __tests__/currentUserRouter.test.ts
 *
 * This file contains test cases for the "currentUser" API, which provides information about the currently authenticated user.
 * It verifies the expected behavior under different scenarios, ensuring that valid requests return the correct user data and invalid requests return appropriate error responses.
 *
 * Test Cases:
 *  - ✅ Successful Request: Ensures signed-in users can retrieve their user data.
 *  - ✅ Unauthorized Request: Verifies that users without valid sessions are denied access.
 *  - ✅ Session Handling: Ensures users cannot access their data after signing out.
 *
 * Usage:
 *  - Uses `supertest` to send HTTP requests to the currentUser endpoint.
 *  - Provides helper functions (`signUp`, `signIn`, `signOut`, `currentUser`) for improved readability and reusability.
 */

import request from "supertest";
import { app } from "../../app";

// Helper functions for user authentication actions
const signUp = (data: object, expectedStatus: number) => request(app).post("/api/users/signUp").send(data).expect(expectedStatus);

const signIn = async (data: object, expectedStatus: number) => {
  const response = await request(app).post("/api/users/signIn").send(data).expect(expectedStatus);
  return response.get("Set-Cookie");
};

const currentUser = async (cookie: string[] | undefined, expectedStatus: number) => {
  const requestBuilder = request(app).get("/api/users/currentUser");
  if (cookie) requestBuilder.set("Cookie", cookie);

  const response = await requestBuilder.expect(expectedStatus);
  return response;
};

const signOut = async (cookie: string[] | undefined, expectedStatus: number) => {
  const requestBuilder = request(app).post("/api/users/signOut");
  if (cookie) requestBuilder.set("Cookie", cookie);

  const response = await requestBuilder.expect(expectedStatus);
  return response.get("Set-Cookie");
};

describe("Current User API", () => {
  /**
   * ✅ Test Case: Successful Request
   *
   * This test verifies that a signed-in user can retrieve their current user data.
   * Expected Behavior:
   *  - User signs up and logs in.
   *  - A valid session cookie is returned.
   *  - User can retrieve their current user data with a 200 response.
   */
  it("returns 200 for signed-in users retrieving current user data", async () => {
    // Step 1: Sign up a new user
    await signUp({ username: "ermis", password: "123456" }, 201);

    // Step 2: Sign in to get a session cookie
    const cookie = await signIn({ username: "ermis", password: "123456" }, 200);

    // Step 3: Call the currentUser endpoint with the valid session cookie
    const response = await currentUser(cookie, 200);

    // Step 4: Verify that the response contains the correct user data
    expect(response.body.username).toBe("ermis");
  });

  /**
   * ✅ Test Case: Unauthorized Request
   *
   * This test verifies that a user without a valid session cannot retrieve their current user data.
   * Expected Behavior:
   *  - No authentication is performed.
   *  - User attempts to access the currentUser endpoint without a session cookie.
   *  - The API responds with a 401 Unauthorized status.
   */
  it("returns 401 if no user is signed in", async () => {
    // Step 1: Try to access the currentUser endpoint without any session (no cookie)
    const response = await currentUser(undefined, 401);

    // Step 2: Verify that the response is unauthorized
    expect(response.status).toBe(401);
  });

  /**
   * ✅ Test Case: Session Handling After Sign-out
   *
   * This test ensures that a user cannot access their current user data after signing out.
   * Expected Behavior:
   *  - User signs up, logs in, and gets a session cookie.
   *  - User signs out.
   *  - After signing out, the user should not be able to access the currentUser endpoint and should receive a 401 Unauthorized status.
   */
  it("returns 401 if user is signed out", async () => {
    // Step 1: Sign up and sign in to get a valid session cookie
    await signUp({ username: "ermis", password: "123456" }, 201);
    let cookie = await signIn({ username: "ermis", password: "123456" }, 200);

    // Step 2: Call currentUser endpoint while signed in
    await currentUser(cookie, 200);

    // Step 3: Sign out the user and get the expired session cookie
    cookie = await signOut(cookie, 200);

    // Step 4: Try to access currentUser endpoint with the expired session cookie (should fail with 401)
    await currentUser(cookie, 401);
  });
});
