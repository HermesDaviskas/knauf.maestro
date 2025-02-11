import { CustomError, Status, CustomErrorJSON } from "./CustomError";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  public status: Status = [400, "RequestValidationError"];

  constructor(public messages: ValidationError[]) {
    super(JSON.stringify(messages));
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      status: this.status,
      messages: this.messages,
    };
  }
}
