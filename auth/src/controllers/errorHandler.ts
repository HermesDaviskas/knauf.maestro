import { Request, Response, NextFunction } from "express";
import {
  RequestValidationError,
  UnknownErrorInstance,
} from "../../../errorHandler/models";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log("Handling request validation error");
    res.status(err.errorCode).send(err);
  } else {
    console.log("Handling unknown error");
    const unknownErrorInstance = new UnknownErrorInstance({
      inService: "unreferenced",
      inFunction: "unreferenced",
      operationFailed: err.message,
    });
    res.status(unknownErrorInstance.errorCode).send(unknownErrorInstance);
  }
};
