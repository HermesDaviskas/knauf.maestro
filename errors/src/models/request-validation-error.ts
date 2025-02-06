import { ValidationError } from "express-validator";
import { RequestValidationErrorParams } from "../../interfaces/RequestValidationErrorParams";
import { GenericErrorParams } from "../../interfaces/GenericErrorParams";

export class RequestValidationError extends Error {
  public readonly inService: string;
  public readonly inFunction: string;
  public readonly errorCode: number = 400;
  public readonly type: string = "RequestValidationError";
  private readonly fieldErrors: ValidationError[];
  public readonly details: { message: string; field: string }[];
  public readonly result: string;

  constructor({
    inService,
    inFunction,
    fieldErrors,
    result,
  }: RequestValidationErrorParams) {
    super(result);
    this.inService = inService;
    this.inFunction = inFunction;
    this.fieldErrors = fieldErrors;
    this.result = result;
    this.details = fieldErrors
      .map((error) =>
        error.type === "field"
          ? { message: error.msg, field: error.path }
          : null
      )
      .filter(
        (error): error is { message: string; field: string } => error !== null
      );

    // Ensuring correct prototype chain
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestValidationError);
    }
  }

  toJSON() {
    return {
      errorCode: this.errorCode,
      type: this.type,
      details: this.details,
      inService: this.inService,
      inFunction: this.inFunction,
      result: this.result,
    };
  }
}
