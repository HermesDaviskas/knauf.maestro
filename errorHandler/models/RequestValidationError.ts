import { ErrorConstructorParam, ErrorResponseParam } from "../interfaces";

export class RequestValidationError extends Error {
  public readonly errorCode: number = 400;
  private readonly formattedError: ErrorResponseParam;

  constructor(errorSource: ErrorConstructorParam) {
    super("RequestValidationError");

    Object.setPrototypeOf(this, RequestValidationError.prototype);

    this.formattedError = {
      success: false,
      errorCode: this.errorCode,
      errorClass: "RequestValidationError",
      errorTriggers: errorSource.errorTriggers,
      inService: errorSource.inService,
      inFunction: errorSource.inFunction,
      inOperation: errorSource.inOperation,
    };
  }

  toJSON() {
    return this.formattedError;
  }
}
