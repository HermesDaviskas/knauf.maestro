import { CustomError, Status, CustomErrorJSON } from "./CustomError";

export class BadRequestError extends CustomError {
  public status: Status = [404, "BadRequestError"];

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      status: this.status,
      messages: [{ msg: this.message }],
    };
  }
}
