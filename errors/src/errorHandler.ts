import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "./models/request-validation-error";

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
    res.status(300).send(err);
  }
};
