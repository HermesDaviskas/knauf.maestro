import { ErrorConstructorParam, ErrorResponseParam } from "../interfaces";

export class RequestValidationError extends Error {
  public readonly success: boolean = false;
  public readonly errorCode: number = 400;
  public readonly error: string = "RequestValidationError";
  public readonly inService: string;
  public readonly inFunction: string;
  public readonly operationFailed: string;

  constructor({
    inService,
    inFunction,
    operationFailed,
  }: ErrorConstructorParam) {
    super(operationFailed);
    this.inService = inService;
    this.inFunction = inFunction;
    this.operationFailed = operationFailed;
  }

  toJSON(): ErrorResponseParam {
    return {
      success: this.success,
      errorCode: this.errorCode,
      error: this.error,
      inService: this.inService,
      inFunction: this.inFunction,
      operationFailed: this.operationFailed,
    };
  }
}
