import { CustomError, Status, CustomErrorJSON } from "./CustomError";

/**
 * @file errors/InternalServerError.ts
 *
 * This file defines the `InternalServerError` class, which extends the base `CustomError` class.
 * It represents an HTTP 500 Internal Server Error, typically used when an unexpected server error occurs.
 *
 * Key Responsibilities:
 *  - Inherits from `CustomError` to ensure consistency in error formatting.
 *  - Defines an HTTP status code (500) and a description ("Internal Server Error").
 *  - Provides a `toJSON()` method for converting the error into a structured JSON response.
 *
 * Usage Example:
 *
 * const error = new InternalServerError("Unexpected server error");
 * return res.status(error.status[0]).json(error.toJSON());
 *
 */
export class InternalServerError extends CustomError {
  /**
   * Represents the HTTP status for this error.
   * In this case, it corresponds to a 500 Internal Server Error.
   */
  public status: Status = [500, "Internal Server Error"];

  /**
   * Creates a new instance of the `InternalServerError`.
   *
   * @param message - The error message that describes the issue encountered on the server.
   * This message will be sent back in the response body to help the client understand the error.
   */
  constructor(public message: string) {
    super(message); // Pass the message to the parent class (CustomError)
    Object.setPrototypeOf(this, InternalServerError.prototype); // Ensure correct prototype chain
  }

  /**
   * Converts the error into a structured JSON response format.
   *
   * @returns A `CustomErrorJSON` object containing:
   *  - success: false
   *  - status: The HTTP status code and description (500, "Internal Server Error")
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
