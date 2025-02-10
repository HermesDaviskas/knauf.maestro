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
    cra: CustomResponseArgs
  ) {
    super();
    this.statusCode = cra.statusCode;
    this.inOperation = cra.inOperation;
    this.data = Array.isArray(cra.data) ? cra.data : [cra.data];
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
