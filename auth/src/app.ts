/**
 * @file app.ts
 *
 * This file serves as the main entry point for the application.
 * It initializes the Express server, sets up middleware, connects to the database,
 * and defines the main route handlers.
 *
 * Key Responsibilities:
 *  - Configures and initializes Express.
 *  - Registers global middlewares (CORS, JSON parsing, error handling).
 *  - Connects to MongoDB.
 *  - Registers route handlers for authentication-related functionality.
 *  - Handles unmatched routes with a 404 Not Found error.
 *
 * Usage:
 *  - Start the server with: `node index.js` or `ts-node index.ts`
 *
 * @requires express - Web framework for Node.js.
 * @requires cors - Middleware for enabling CORS.
 * @requires express-async-errors - Enhances Express with better async error handling.
 * @requires body-parser - Middleware for parsing JSON request bodies.
 * @requires mongoose - ODM library for MongoDB interactions.
 * @requires routes/index - Centralized export of all route handlers.
 * @requires middlewares/index - Global middleware, including error handling.
 */

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import {
  currentUserRouter,
  signInRouter,
  signUpRouter,
  signOutRouter,
  defaultRouter,
} from "./routes";

import { errorHandler } from "./middlewares";

// Initialize Express application
const app = express();

// Apply middleware for CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    credentials: true, // Allow sending credentials (cookies) in CORS requests
  })
);

// Apply middleware to parse JSON bodies in requests
app.use(json());

// Trust the proxy to handle reverse proxies like NginX
app.set("trust proxy", true);

// Apply middleware for session management
app.use(
  cookieSession({
    signed: false, // No encryption of session cookie
    // secure: process.env.NODE_ENV !== "test", // Use HTTPS in non-test environments
    secure: false,
  })
);

// Register the route handlers for different parts of the API
app.use(currentUserRouter); // Handles current user-related routes
app.use(signInRouter); // Handles sign-in requests
app.use(signUpRouter); // Handles sign-up requests
app.use(signOutRouter); // Handles sign-out requests
app.use(defaultRouter); // Handles any unmatched routes

// Register global error handler middleware to catch and process errors
app.use(errorHandler);

export { app };
