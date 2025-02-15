import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  username: string;
  isBanned: boolean;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const setCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();

  try {
    const jwtSession = req.session.jwt;
    const jwtKey = process.env.JWT_KEY!;
    const payload = jwt.verify(jwtSession, jwtKey) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    return next();
  }

  next();
};
