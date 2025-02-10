import { CustomError, CustomErrorArgs, CustomErrorJSON } from "./CustomError";

export class UknownInstanceError extends CustomError {
  errorCode = 500;

  constructor(customErrorArgs: CustomErrorArgs) {
    super(customErrorArgs);
    Object.setPrototypeOf(this, UknownInstanceError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      errorCode: this.errorCode,
      errorClass: "UknownInstanceError",
      errorTriggers: this.customErrorArgs.errorTriggers,
      inService: this.customErrorArgs.inService ?? null,
      inFunction: this.customErrorArgs.inFunction ?? null,
      inOperation: this.customErrorArgs.inOperation ?? null,
    };
  }
}
