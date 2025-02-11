import { CustomError, Status, CustomErrorJSON } from "./CustomError";

export class InternalServerError extends CustomError {
  public status: Status = [500, "InternalServerError"];

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      status: this.status,
      messages: [{ msg: this.message }],
    };
  }
}
