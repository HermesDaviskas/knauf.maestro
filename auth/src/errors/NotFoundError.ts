import { CustomError, CustomErrorJSON } from "./CustomError";

export class NotFoundError extends CustomError {
  errorCode = 404;

  constructor(public errorTriggers?: string) {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      errorCode: this.errorCode,
      errorClass: "NotFoundError",
      errorTriggers: this.errorTriggers
        ? [{ msg: this.errorTriggers }]
        : [{ msg: "Resource not found" }], // Fallback message
      inService: "auth",
      // Optional fields:
      // inFunction: this.customErrorArgs?.inFunction ?? null,
      // inOperation: this.customErrorArgs?.inOperation ?? null,
    };
  }
}
