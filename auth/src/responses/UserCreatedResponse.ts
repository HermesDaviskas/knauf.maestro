import { Request, Response } from "express";
import { CustomResponse, CustomResponseJSON } from "./CustomResponse";

export class UserCreatedResponse extends CustomResponse {
  public statusCode = 201;
  private inOperation = "Creating new user";

  constructor(private req: Request, private res: Response) {
    super();
  }

  toJSON(): CustomResponseJSON {
    return {
      success: true,
      statusCode: this.statusCode,
      inOperation: this.inOperation,
      data: Array.isArray(this.req.body) ? this.req.body : [this.req.body],
    };
  }

  sendResponse() {
    this.res.status(this.statusCode).send(this.toJSON());
  }
}
