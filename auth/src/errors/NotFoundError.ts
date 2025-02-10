import { CustomError, CustomErrorArgs, CustomErrorJSON } from "./CustomError";

export class NotFoundError extends CustomError {
  errorCode = 404;

  constructor(customErrorArgs: CustomErrorArgs) {
    super(customErrorArgs);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      errorCode: this.errorCode,
      errorClass: "NotFoundError",
      errorTriggers: this.customErrorArgs.errorTriggers,
      inService: this.customErrorArgs.inService ?? null,
      inFunction: this.customErrorArgs.inFunction ?? null,
      inOperation: this.customErrorArgs.inOperation ?? null,
    };
  }
}
