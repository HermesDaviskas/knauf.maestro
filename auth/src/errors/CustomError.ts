import { ValidationError } from "express-validator";

/**
 * @file errors/CustomError.ts
 *
 * This file defines the base class for custom error handling in the application.
 * All custom error classes should extend this abstract class to enforce consistency
 * in error responses.
 *
 * Key Responsibilities:
 *  - Defines the structure for HTTP status codes and error messages.
 *  - Provides a contract (`toJSON()`) for transforming errors into JSON responses.
 *  - Ensures proper inheritance and prototype handling for custom errors.
 *
 * Usage Example:
 *
 * class NotFoundError extends CustomError {
 *   status: Status = [404, "Not Found"];
 *
 *   constructor(message: string = "Resource not found") {
 *     super(message);
 *   }
 *
 *   toJSON(): CustomErrorJSON {
 *     return {
 *       success: false,
 *       status: this.status,
 *       messages: [{ msg: this.message }],
 *     };
 *   }
 * }
 *
 */

/**
 * Type alias representing an HTTP status, which consists of:
 *  - `statusCode`: Numeric HTTP status code (e.g., 404, 500).
 *  - `statusDesc`: Short description of the status (e.g., "Not Found", "Internal Server Error").
 */
export type Status = [statusCode: number, statusDesc: string];

/**
 * Type representing a standard error message format.
 * The `msg` field holds a single message string.
 * For validation purposes, you might also extend this type to include more details.
 */
export type Message = { msg: string };

/**
 * Interface defining the structure of a JSON response for all custom errors.
 * Includes success status, HTTP status, and the messages which could be validation errors.
 */
export interface CustomErrorJSON {
  success: boolean;
  status: Status;
  messages: Message[] | ValidationError[];
}

/**
 * Abstract base class for custom application errors.
 * All custom errors must extend this class and implement the `toJSON()` method to generate a JSON response.
 */
export abstract class CustomError extends Error {
  /**
   * HTTP status code and description for the error.
   * This property must be defined in the subclass.
   */
  abstract status: Status;

  /**
   * Creates a new instance of a custom error.
   *
   * @param message - The error message describing the issue.
   * This constructor should be used as a base for all error subclasses.
   */
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype); // Ensure proper prototype chain
  }

  /**
   * Method to convert the error into a structured JSON response.
   * This method must be implemented by all subclasses of `CustomError`.
   *
   * @returns A structured JSON object that will be used in the API response.
   */
  abstract toJSON(): CustomErrorJSON;
}
