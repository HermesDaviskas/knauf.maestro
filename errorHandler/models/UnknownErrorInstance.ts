import { ErrorConstructorParam, ErrorResponseParam } from "../interfaces";

export class UnknownErrorInstance extends Error {
  public readonly errorCode: number = 500;
  private readonly formattedError: ErrorResponseParam;

  constructor(errorSource: ErrorConstructorParam) {
    super("UnknownErrorInstance");

    Object.setPrototypeOf(this, UnknownErrorInstance.prototype);

    this.formattedError = {
      success: false,
      errorCode: this.errorCode,
      errorClass: "UnknownErrorInstance",
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
