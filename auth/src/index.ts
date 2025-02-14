/**
 * @file index.ts
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
import mongoose from "mongoose";
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

// Apply middleware
app.use(
  cors({
    credentials: true, // Allow sending credentials (cookies)
  })
);
app.use(json()); // Enable JSON body parsing
app.set("trust proxy", true); // Because traffic goes through NginX proxy
app.use(
  cookieSession({
    signed: false, // Encryption: True -> Enabled, False -> Disabled
    secure: false, // Use HTTPS: True -> Required, False -> Not required
  })
);

// Register API routes
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(defaultRouter);

// Apply global error handler middleware
app.use(errorHandler);

async function startServer() {
  try {
    if (!process.env.JWT_KEY) throw new Error("JWT_KEY not defined");

    // Function to establish a connection to MongoDB
    await mongoose.connect("mongodb://auth-mongo-clusterip-srv:3011/auth");
    console.log("Connected to authentication database.");

    // Start the Express server only after a successful DB connection
    app.listen(3001, () => {
      console.log("knauf.maestro_auth microservice is running");
      console.log("Listening on port 3001");
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error on starting application.", errorMessage);
    process.exit(1);
  }
}

// Start the application
startServer();

export { app };
