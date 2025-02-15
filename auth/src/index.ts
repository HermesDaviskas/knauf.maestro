/**
 * @file index.ts
 *
 * This file serves as the entry point for starting the server and connecting to the MongoDB database.
 * It checks if the necessary environment variables are set, establishes the database connection,
 * and starts the Express server.
 *
 * Key Responsibilities:
 *  - Verifies that the required JWT key is defined in environment variables.
 *  - Establishes a connection to the MongoDB database using Mongoose.
 *  - Starts the Express server only after a successful database connection.
 *  - Catches and logs errors that occur during the startup process.
 *
 * @requires mongoose - ODM library for MongoDB interactions.
 * @requires app - The Express application to start the server.
 */

import { app } from "./app";
import mongoose from "mongoose";

async function startServer() {
  try {
    // Ensure the JWT_KEY environment variable is defined
    if (!process.env.JWT_KEY) throw new Error("JWT_KEY not defined");

    // Establish a connection to the MongoDB database
    await mongoose.connect("mongodb://auth-mongo-clusterip-srv:3011/auth");
    console.log("Connected to authentication database.");

    // Start the Express server after a successful DB connection
    app.listen(3001, () => {
      console.log("knauf.maestro_auth microservice is running");
      console.log("Listening on port 3001");
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error on starting application.", errorMessage);
    process.exit(1); // Exit the application with an error code
  }
}

// Call the startServer function to initialize the app
startServer();
