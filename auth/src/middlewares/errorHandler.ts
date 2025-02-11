import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";
import { UnknownInstanceError } from "../errors/UnknownInstanceError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log(err.toJSON());
    res.status(err.errorCode).send(err.toJSON());
  } else {
    const unknownInstError = new UnknownInstanceError(err.message);
    console.log(unknownInstError.toJSON());
    res.status(unknownInstError.errorCode).send(unknownInstError.toJSON());
  }
};
