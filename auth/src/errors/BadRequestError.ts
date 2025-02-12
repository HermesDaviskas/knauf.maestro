import { CustomError, Status, CustomErrorJSON } from "./CustomError";

/**
 * @file errors/BadRequestError.ts
 *
 * This file defines the `BadRequestError` class, which extends the base `CustomError` class.
 * It represents an HTTP 400 Bad Request error, typically used when the client sends invalid data.
 *
 * Key Responsibilities:
 *  - Inherits from `CustomError` to ensure consistent error formatting.
 *  - Defines an HTTP status code (400) and a description ("Bad Request").
 *  - Provides a `toJSON()` method to convert the error into a structured JSON response.
 *
 * Usage Example:
 *
 * const error = new BadRequestError("Invalid input data");
 * return res.status(error.status[0]).json(error.toJSON());
 *
 */
export class BadRequestError extends CustomError {
  /**
   * Represents the HTTP status for this error.
   * In this case, it corresponds to a 400 Bad Request error.
   */
  public status: Status = [400, "Bad Request"];

  /**
   * Creates a new instance of the `BadRequestError`.
   *
   * @param message - The error message that describes the issue with the request.
   * This message is typically sent back in the response body.
   */
  constructor(public message: string) {
    super(message); // Pass the message to the parent class (CustomError)
    Object.setPrototypeOf(this, BadRequestError.prototype); // Ensure correct prototype chain
  }

  /**
   * Converts the error into a structured JSON response format.
   *
   * @returns A `CustomErrorJSON` object containing:
   *  - success: false
   *  - status: The HTTP status code and description (400, "Bad Request")
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
