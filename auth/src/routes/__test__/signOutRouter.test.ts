/**
 * @file routes/__tests__/signOutRouter.test.ts
 *
 * This file contains test cases for the user sign-out API.
 * It verifies expected behaviors such as session invalidation and handling unauthenticated requests.
 *
 * Test Cases:
 *  - ✅ Successful Sign-out: Ensures users can sign out and the session is cleared.
 *  - ✅ Not Authenticated: Verifies that signing out without authentication returns a 401 error.
 *  - ✅ Session Cleared After Sign-out: Ensures users cannot sign out again after an initial sign-out.
 *
 * Usage:
 *  - Uses `supertest` to send HTTP requests to the sign-out endpoint.
 *  - Provides helper functions (`signUp`, `signIn`, `signOut`) for improved readability and reusability.
 */

import request from "supertest";
import { app } from "../../app";

// Helper functions for user authentication actions
const signUp = (data: object, expectedStatus: number) => request(app).post("/api/users/signUp").send(data).expect(expectedStatus);

const signIn = async (data: object, expectedStatus: number) => {
  const response = await request(app).post("/api/users/signIn").send(data).expect(expectedStatus);
  return response.get("Set-Cookie");
};

const signOut = async (cookie: string[] | undefined, expectedStatus: number) => {
  const requestBuilder = request(app).post("/api/users/signOut");
  if (cookie) requestBuilder.set("Cookie", cookie);

  const response = await requestBuilder.expect(expectedStatus);
  return response.get("Set-Cookie");
};

describe("User Sign-Out API", () => {
  /**
   * ✅ Test Case: Successful Sign-out
   *
   * This test verifies that a user can successfully sign out.
   * Expected Behavior:
   *  - User signs up and logs in.
   *  - A valid session cookie is returned.
   *  - User signs out, and the response returns a 200 status.
   */
  it("returns 200 on successful sign-out", async () => {
    // Step 1: Sign up a new user
    await signUp({ username: "ermis", password: "123456" }, 201);

    // Step 2: Sign in to get a session cookie
    const cookie = await signIn({ username: "ermis", password: "123456" }, 200);

    // Step 3: Sign out the user and expect a 200 response
    await signOut(cookie, 200);
  });

  /**
   * ✅ Test Case: Session Invalidation After Sign-out
   *
   * This test verifies that after a successful sign-out, the session cookie is invalidated.
   * Expected Behavior:
   *  - User signs up, logs in, and gets a session cookie.
   *  - User signs out.
   *  - The returned cookie should have an expiration date set in the past.
   */
  it("invalidates the session cookie after signing out", async () => {
    // Step 1: Sign up and sign in to get a valid session cookie
    await signUp({ username: "ermis", password: "123456" }, 201);
    const cookie = await signIn({ username: "ermis", password: "123456" }, 200);

    // Step 2: Sign out and retrieve the returned (invalidated) cookie
    const expiredCookie = await signOut(cookie, 200);

    // Step 3: Ensure that a cookie is still returned (even if expired)
    expect(expiredCookie).toBeDefined();
    expect(expiredCookie.length).toBeGreaterThan(0);

    // Step 4: Verify that the cookie is marked as expired
    const cookieHeader = expiredCookie[0];
    expect(cookieHeader).toContain("expires=Thu, 01 Jan 1970 00:00:00 GMT");
  });

  /**
   * ✅ Test Case: Unauthorized Sign-out Attempt
   *
   * This test checks that attempting to sign out without an active session
   * results in a 401 Unauthorized response.
   * Expected Behavior:
   *  - No authentication is performed.
   *  - User attempts to sign out.
   *  - API should respond with 401 Unauthorized.
   */
  it("returns 401 if user is not authenticated", async () => {
    // Step 1: Try to sign out without logging in
    await signOut(undefined, 401);
  });

  /**
   * ✅ Test Case: Session Cleared After Sign-out
   *
   * This test ensures that after signing out, the session is fully cleared.
   * Expected Behavior:
   *  - User signs up, logs in, and gets a session cookie.
   *  - User signs out.
   *  - Attempting to sign out again without re-authenticating should return 401 Unauthorized.
   */
  it("ensures session is cleared after sign-out", async () => {
    // Step 1: Sign up a new user
    await signUp({ username: "ermis", password: "123456" }, 201);

    // Step 2: Sign in and obtain a session cookie
    const cookie = await signIn({ username: "ermis", password: "123456" }, 200);

    // Step 3: Sign out successfully
    const expiredCookie = await signOut(cookie, 200);

    // Step 4: Try to sign out again using the expired cookie (should fail with 401)
    await signOut(expiredCookie, 401);
  });
});
