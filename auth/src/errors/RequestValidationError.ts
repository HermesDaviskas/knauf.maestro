import { CustomError, CustomErrorArgs, CustomErrorJSON } from "./CustomError";

export class RequestValidationError extends CustomError {
  errorCode = 400;

  constructor(customErrorArgs: CustomErrorArgs) {
    super(customErrorArgs);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      errorCode: this.errorCode,
      errorClass: "RequestValidationError",
      errorTriggers: this.customErrorArgs.errorTriggers,
      inService: this.customErrorArgs.inService ?? null,
      inFunction: this.customErrorArgs.inFunction ?? null,
      inOperation: this.customErrorArgs.inOperation ?? null,
    };
  }
}
