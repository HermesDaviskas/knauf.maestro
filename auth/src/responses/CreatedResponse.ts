/**
 * @file responses/CreatedResponse.ts
 *
 * This file defines the `CreatedResponse` class, a standardized response for successful resource creation.
 * It extends the `CustomResponse` abstract class and provides a structured JSON response format.
 *
 * Usage Example:
 *  - When a new resource is successfully created, return an instance of `CreatedResponse`:
 *    new CreatedResponse("User created", userData, res).sendResponse();
 *
 * @typedef {Status} Status - A tuple representing the response status code and its description.
 * @typedef {CustomResponseJSON} CustomResponseJSON - The structured JSON format for API responses.
 *
 * @exports CreatedResponse - Represents a successful resource creation response.
 */

import { CustomResponse, Status, CustomResponseJSON } from "./CustomResponse";
import { Response } from "express";

/**
 * Class representing a successful resource creation response.
 * Returns a 201 Created status with a standardized JSON format.
 */
export class CreatedResponse extends CustomResponse {
  /**
   * Defines the HTTP status code and description for resource creation.
   */
  public status: Status = [201, "Created"];

  /**
   * Constructs a `CreatedResponse` instance.
   *
   * @param {string} message - A descriptive message for the response.
   * @param {any} data - The data associated with the created resource.
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
   * Sends the response to the client with a 201 status code.
   *
   * @async
   */
  async sendResponse() {
    //console.log(this.status, this.message, this.data);
    this.res.status(this.status[0]).send(this.toJSON());
  }
}
