import { CustomError, Status, CustomErrorJSON } from "./CustomError";

/**
 * @file errors/UnauthorizedError.ts
 *
 * This file defines the `UnauthorizedError` class, which extends the base `CustomError` class.
 * It represents an HTTP 401 Unauthorized error, typically used when authentication fails due to
 * incorrect credentials or missing authentication.
 *
 * Key Responsibilities:
 *  - Inherits from `CustomError` to maintain a standardized error structure.
 *  - Defines an HTTP status code (`401`) with the description `"Unauthorized"`.
 *  - Implements a `toJSON()` method to format the error as a structured JSON response.
 *
 * Usage Example:
 *
 * const error = new UnauthorizedError("Invalid username or password");
 * return res.status(error.status[0]).json(error.toJSON());
 *
 * @exports UnauthorizedError - Represents a 401 error for failed authentication.
 */

export class UnauthorizedError extends CustomError {
  /**
   * Defines the HTTP status for this error.
   * The `401 Unauthorized` status indicates authentication failure.
   */
  public status: Status = [401, "Unauthorized"];

  /**
   * Creates a new instance of `UnauthorizedError`.
   *
   * @param message - A descriptive error message explaining why authentication failed.
   */
  constructor(public message: string) {
    super(message); // Pass the message to the base `CustomError` class
    Object.setPrototypeOf(this, UnauthorizedError.prototype); // Ensure correct prototype chain
  }

  /**
   * Converts the error into a structured JSON response format.
   *
   * @returns A `CustomErrorJSON` object containing:
   *  - `success: false` → Indicates the request failed.
   *  - `status: [401, "Unauthorized"]` → The HTTP status code and description.
   *  - `messages: [{ msg: this.message }]` → Array containing the error message.
   */
  toJSON(): CustomErrorJSON {
    return {
      success: false,
      status: this.status,
      messages: [{ msg: this.message }],
    };
  }
}
