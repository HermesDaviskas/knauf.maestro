import { CustomResponse, Status, CustomResponseJSON } from "./CustomResponse";
import { Response } from "express";

export class CreatedResponse extends CustomResponse {
  public status: Status = [201, "CreatedResponse"];

  constructor(public message: string, public data: any, private res: Response) {
    super(data);
  }

  toJSON(): CustomResponseJSON {
    return {
      success: false,
      status: this.status,
      messages: [{ msg: this.message, data: this.data }],
    };
  }

  async sendResponse() {
    this.res.status(this.status[0]).send(this.toJSON());
  }
}
