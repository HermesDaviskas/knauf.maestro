import { CustomError, CustomErrorJSON } from "./CustomError";

export class UserAlreadyExistsError extends CustomError {
  errorCode = 400;

  constructor(public errorTriggers?: string) {
    super();
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      errorCode: this.errorCode,
      errorClass: "UserAlreadyExistsError",
      errorTriggers: this.errorTriggers
        ? [{ msg: this.errorTriggers }]
        : [{ msg: "User already exists" }], // Default message
      inService: "auth",
      // Optional fields:
      // inFunction: this.customErrorArgs?.inFunction ?? null,
      // inOperation: this.customErrorArgs?.inOperation ?? null,
    };
  }
}
