import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) throw new UnauthorizedError("user is not signed in");
  next();
}
