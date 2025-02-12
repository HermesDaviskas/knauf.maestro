import { CustomError, Status, CustomErrorJSON } from "./CustomError";

/**
 * @file errors/NotFoundError.ts
 *
 * This file defines the `NotFoundError` class, which extends the base `CustomError` class.
 * It represents an HTTP 404 Not Found Error, typically used when a resource cannot be found.
 *
 * Key Responsibilities:
 *  - Inherits from `CustomError` to maintain consistency in error formatting across the application.
 *  - Defines an HTTP status code (404) and a description ("Not Found").
 *  - Provides a `toJSON()` method for converting the error into a structured JSON response.
 *
 * Usage Example:
 *
 * const error = new NotFoundError("Resource not found");
 * return res.status(error.status[0]).json(error.toJSON());
 *
 */
export class NotFoundError extends CustomError {
  /**
   * Represents the HTTP status for this error.
   * In this case, it corresponds to a 404 Not Found Error.
   */
  public status: Status = [404, "Not Found"];

  /**
   * Creates a new instance of the `NotFoundError`.
   *
   * @param message - The error message that describes the missing resource or unavailable endpoint.
   * This message will be sent back in the response to inform the client about the specific error.
   */
  constructor(public message: string) {
    super(message); // Pass the message to the parent class (CustomError)
    Object.setPrototypeOf(this, NotFoundError.prototype); // Ensure correct prototype chain
  }

  /**
   * Converts the error into a structured JSON response format.
   *
   * @returns A `CustomErrorJSON` object containing:
   *  - success: false
   *  - status: The HTTP status code and description (404, "Not Found")
   *  - messages: An array of error messages (each with the `msg` field)
   */
  toJSON(): CustomErrorJSON {
    return {
      success: false, // Indicates failure
      status: this.status, // The status code and description
      messages: [{ msg: this.message }], // The error message itself
    };
  }
}
