/**
 * @file test/setup.ts
 *
 * This file contains setup and teardown logic for Jest tests, using an in-memory MongoDB instance for isolated testing.
 * It configures the test environment, including setting up a mock JWT key, initializing an in-memory MongoDB server,
 * and cleaning up the database before and after each test.
 *
 * Configuration:
 *  - Uses `jest.setTimeout` to extend the default test timeout.
 *  - Initializes `MongoMemoryServer` for running a temporary MongoDB instance.
 *  - Ensures all collections are cleared between tests to maintain a clean testing environment.
 *
 * Usage:
 *  - This setup file is automatically executed by Jest before the test suite runs and after all tests complete.
 */

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

// Set global timeout for all tests
jest.setTimeout(10000);

// Declare the mongo variable to manage the in-memory MongoDB instance
let mongo: MongoMemoryServer;

beforeAll(async () => {
  // Set up the JWT_KEY environment variable for testing
  process.env.JWT_KEY = "asdf";

  // Initialize an in-memory MongoDB server for testing
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  // Connect to the in-memory database using mongoose
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  // Ensure the MongoDB connection is established before each test
  if (!mongoose.connection.db) throw new Error("Database connection is not established");

  // Get all collections in the database
  const collections = await mongoose.connection.db.collections();

  // Clear all documents from all collections to start with a clean state
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  // Stop the in-memory MongoDB server after all tests are completed
  if (mongo) await mongo.stop();

  // Close the mongoose connection to the database
  await mongoose.connection.close();
});
