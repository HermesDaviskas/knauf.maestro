/**
 * @file responses/CustomResponse.ts
 *
 * This abstract class serves as a blueprint for all custom response objects in the application.
 * It defines a structured format for API responses, ensuring consistency across different response types.
 *
 * Usage Example:
 *  - Extend this class to create specific response types, such as `CreatedResponse` or `ErrorResponse`.
 *    class CreatedResponse extends CustomResponse { ... }
 *
 * @typedef {Status} Status - A tuple representing the response status code and its description.
 * @typedef {Message} Message - An object containing a response message and associated data.
 * @typedef {CustomResponseJSON} CustomResponseJSON - The standardized JSON format for all responses.
 *
 * @exports CustomResponse - Abstract base class for structured API responses.
 */

export type Status = [statusCode: number, statusDesc: string];

export type Message = { msg: string; data: any };

export interface CustomResponseJSON {
  success: boolean;
  status: Status;
  messages: Message[];
}

/**
 * Abstract class that enforces a consistent response structure across the application.
 * All custom responses must extend this class and implement its methods.
 */
export abstract class CustomResponse {
  /**
   * Defines the HTTP status code and its description for the response.
   * Must be implemented by subclasses.
   */
  abstract status: Status;

  constructor(public message: string) {}

  /**
   * Converts the response into a standardized JSON format.
   * Must be implemented by subclasses.
   *
   * @returns {CustomResponseJSON} - The structured response object.
   */
  abstract toJSON(): CustomResponseJSON;

  /**
   * Sends the response to the client.
   * Must be implemented by subclasses.
   */
  abstract sendResponse(): void;
}
