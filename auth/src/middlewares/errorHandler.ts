import { Request, Response, NextFunction } from "express";
import { CustomError, InternalServerError } from "../errors";

/**
 * @file middlewares/errorHandler.ts
 *
 * Global error handler middleware for handling errors in the application.
 * This middleware captures both custom errors (like BadRequestError) and unexpected errors.
 * It logs the error details and sends an appropriate HTTP response to the client.
 *
 * Usage Example:
 *  - This middleware is used in the Express app to catch and handle errors from all route handlers.
 *
 * @param err    - The error object, which could be a CustomError or a generic JavaScript Error.
 * @param req    - The Express request object.
 * @param res    - The Express response object.
 * @param next   - The next middleware function (not used in this case as the response is sent).
 *
 * @returns Sends a structured error response to the client.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    // Log the custom error
    console.log(err.status, err.message);
    // Send the custom error response
    res.status(err.status[0]).send(err.toJSON());
  } else {
    // Handle unexpected errors with a generic internal server error
    const genericError = new InternalServerError(err.message);
    // Log the generic error
    console.log(genericError.status, genericError.message);
    // Send a generic error response
    res.status(genericError.status[0]).send(genericError.toJSON());
  }
};
