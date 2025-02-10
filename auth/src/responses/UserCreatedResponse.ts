import { Request, Response } from "express";
import { CustomResponse, CustomResponseJSON } from "./CustomResponse";

export class UserCreatedResponse extends CustomResponse {
  public statusCode: number;
  private inOperation: string;
  private data: any;

  constructor(private req: Request, private res: Response) {
    super();
    this.statusCode = 201;
    this.inOperation = "Creating new user";
    this.data = Array.isArray(req.body) ? req.body : [req.body];
  }

  toJSON(): CustomResponseJSON {
    return {
      success: true,
      statusCode: this.statusCode,
      inOperation: this.inOperation,
      data: this.data,
    };
  }

  sendResponse() {
    this.res.status(this.statusCode).send(this.toJSON());
  }
}
