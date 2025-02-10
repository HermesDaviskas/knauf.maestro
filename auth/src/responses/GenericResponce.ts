import { Request, Response } from "express";
import { CustomResponse, CustomResponseJSON } from "./CustomResponse";
import { CustomResponseArgs } from "./CustomResponseArgs";

export class GenericResponse extends CustomResponse {
  public statusCode: number;
  private inOperation: string;
  private data: any;

  constructor(
    private req: Request,
    private res: Response,
    customResponseArgs: CustomResponseArgs
  ) {
    super();
    this.statusCode = customResponseArgs.statusCode;
    this.inOperation = customResponseArgs.inOperation;
    this.data = customResponseArgs.data;
  }

  toJSON(): CustomResponseJSON {
    return {
      success: true,
      statusCode: this.statusCode,
      inOperation: this.inOperation,
      data: Array.isArray(this.data) ? this.data : [this.data],
    };
  }

  sendResponse() {
    this.res.status(this.statusCode).send(this.toJSON());
  }
}
