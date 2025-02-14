/**
 * @file responses/OkResponse.ts
 *
 * This file defines the `OkResponse` class, a standardized response for successful API requests.
 * It extends the `CustomResponse` abstract class and provides a structured JSON response format.
 *
 * Usage Example:
 *  - When an operation completes successfully, return an instance of `OkResponse`:
 *    new OkResponse("Operation successful", responseData, res).sendResponse();
 *
 * @typedef {Status} Status - A tuple representing the response status code and its description.
 * @typedef {CustomResponseJSON} CustomResponseJSON - The standardized JSON format for API responses.
 *
 * @exports OkResponse - Represents a successful response with a 200 status code.
 */

import { CustomResponse, Status, CustomResponseJSON } from "./CustomResponse";
import { Response } from "express";

/**
 * Class representing a successful API response.
 * Returns a 200 OK status with a structured JSON format.
 */
export class OkResponse extends CustomResponse {
  /**
   * Defines the HTTP status code and its description for a successful response.
   */
  public status: Status = [200, "OK"];

  /**
   * Constructs an `OkResponse` instance.
   *
   * @param {string} message - A descriptive message for the response.
   * @param {any} data - The data associated with the response.
   * @param {Response} res - The Express response object.
   */
  constructor(public message: string, public data: any, private res: Response) {
    super(message);
  }

  /**
   * Converts the response into a standardized JSON format.
   *
   * @returns {CustomResponseJSON} - The structured response object.
   */
  toJSON(): CustomResponseJSON {
    return {
      success: true,
      status: this.status,
      messages: [{ msg: this.message, data: this.data }],
    };
  }

  /**
   * Sends the response to the client with a 200 status code.
   *
   * @async
   */
  async sendResponse() {
    console.log(this.status, this.message, this.data);
    this.res.status(this.status[0]).send(this.toJSON());
  }
}
