import { CustomError, Status, CustomErrorJSON } from "./CustomError";

export class NotFoundError extends CustomError {
  public status: Status = [404, "NotFoundError"];

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  toJSON(): CustomErrorJSON {
    return {
      success: false,
      status: this.status,
      messages: [{ msg: this.message }],
    };
  }
}
