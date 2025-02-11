import { Request, Response, NextFunction } from "express";
import { CustomError, InternalServerError } from "../errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log(err.toJSON());
    res.status(err.status[0]).send(err.toJSON());
  } else {
    const internalServerError = new InternalServerError(err.message);
    console.log(internalServerError.toJSON());
    res
      .status(internalServerError.status[0])
      .send(internalServerError.toJSON());
  }
};
