import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";
import { CustomErrorJSON } from "../errors/CustomErrorJSON";
import { UknownInstanceError } from "../errors/UknownInstanceError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.errorCode).send(err.toJSON());
  } else {
    const uknownInstanceError = new UknownInstanceError({
      errorTriggers: [{ msg: err }],
    });
    res.status(uknownInstanceError.errorCode).send(uknownInstanceError);
  }
};
