import { ErrorConstructorParam, ErrorResponseParam } from "../interfaces";

export class UnknownErrorInstance extends Error {
  public readonly success: boolean = false;
  public readonly errorCode: number = 500;
  public readonly error: string = "UnknownErrorInstance";
  public readonly inService: string;
  public readonly inFunction: string;
  public readonly operationFailed: string;

  constructor({
    inService,
    inFunction,
    operationFailed,
  }: ErrorConstructorParam) {
    super("UnknownErrorInstance");
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
