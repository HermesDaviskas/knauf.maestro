import { ValidationError } from "express-validator";

export type Status = [statusCode: number, statusDesc: string];

export type Message = { msg: string };

export interface CustomErrorJSON {
  success: boolean;
  status: Status;
  messages: Message[] | ValidationError[];
}

export abstract class CustomError extends Error {
  abstract status: Status;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // Method to transform the response into JSON format
  abstract toJSON(): CustomErrorJSON;
}
