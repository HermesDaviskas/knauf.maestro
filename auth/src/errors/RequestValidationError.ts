import { CustomError, CustomErrorArgs, CustomErrorJSON } from "./CustomError";
import { validationResult, ValidationError } from "express-validator";
import { ErrorTrigger } from "./CustomErrorJSON";

export class RequestValidationError extends CustomError {
  errorCode = 400;

  constructor(public errorTriggers: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      errorCode: this.errorCode,
      errorClass: "RequestValidationError",
      errorTriggers: this.errorTriggers,
      inService: "auth",
      // Optional fields can be added here if needed:
      // inFunction: this.customErrorArgs?.inFunction ?? null,
      // inOperation: this.customErrorArgs?.inOperation ?? null,
    };
  }
}
