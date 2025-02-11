import { CustomError, CustomErrorJSON } from "./CustomError";

export class UnknownInstanceError extends CustomError {
  errorCode = 500;

  constructor(public errorTriggers?: string) {
    super();
    Object.setPrototypeOf(this, UnknownInstanceError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      errorCode: this.errorCode,
      errorClass: "UnknownInstanceError",
      errorTriggers: this.errorTriggers
        ? [{ msg: this.errorTriggers }]
        : [{ msg: "An unknown instance error occurred" }],
      inService: "auth",
      // Optional fields:
      // inFunction: this.customErrorArgs?.inFunction ?? null,
      // inOperation: this.customErrorArgs?.inOperation ?? null,
    };
  }
}
