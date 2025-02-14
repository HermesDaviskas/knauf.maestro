/**
 * @file errors/index.ts
 *
 * This file acts as a central export point for all custom error classes in the application.
 * It provides easy access to different types of errors, allowing them to be imported and used
 * consistently throughout the application.
 *
 * Key Responsibilities:
 *  - Exports various custom error classes to be used across the application.
 *  - Allows for the creation and throwing of different error types, such as `BadRequestError`,
 *    `InternalServerError`, `NotFoundError`, and `RequestValidationError`.
 *  - Facilitates consistent error handling by standardizing error types and response formats.
 *
 * Usage Example:
 *
 * import { BadRequestError, NotFoundError } from "./errors";
 *
 * Throwing a BadRequestError when a request validation fails
 * throw new BadRequestError("Invalid input data");
 *
 * Throwing a NotFoundError when a requested resource is not found
 * throw new NotFoundError("Resource not found");
 *
 */

// Importing custom error classes
import { CustomError } from "./CustomError";
import { RequestValidationError } from "./RequestValidationError";
import { BadRequestError } from "./BadRequestError";
import { UnauthorizedError } from "./UnauthorizedError";
import { NotFoundError } from "./NotFoundError";
import { InternalServerError } from "./InternalServerError";

// Exporting the custom error classes for easy access throughout the application
export {
  CustomError, // The base class for all custom errors
  RequestValidationError, // Error for validation failures (400)
  BadRequestError, // Error for bad client request (400)
  UnauthorizedError, // Error for wrong credentials request (401)
  NotFoundError, // Error for missing resources (404)
  InternalServerError, // Error for server-side issues (500)
};
