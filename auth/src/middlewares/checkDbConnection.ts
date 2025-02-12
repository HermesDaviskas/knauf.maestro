/**
 * @file middlewares/checkDbConnection.ts
 *
 * This file defines middleware for checking the current connection status of the
 * MongoDB database using Mongoose. It ensures that the database is connected before
 * proceeding with the execution of further requests.
 *
 * @exports checkDbConnection - Middleware that checks the database connection status.
 */

import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { InternalServerError } from "../errors";

/**
 * Middleware function that checks if the database is connected before proceeding.
 * If the database is not connected, it forwards an InternalServerError to the
 * next error handler. If connected, it allows the request to continue to the
 * next middleware or route handler.
 *
 * @returns Express middleware function that checks the MongoDB connection status.
 */
export function checkDbConnection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Check if Mongoose is connection state
    // If not connected, send an InternalServerError and stop further request processing
    // else, proceed to the next middleware or route handler
    if (mongoose.connection.readyState === 0)
      return next(new InternalServerError("Database connection failed"));
    else next();
  } catch (err) {
    // If an error occurs in function, pass it to the next error handler
    return next(new InternalServerError(`checkDbConnection(): ${err}`));
  }
}
