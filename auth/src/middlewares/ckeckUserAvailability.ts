import { Request, Response, NextFunction } from "express";
import { isUsernameInDB } from "../utilities";
import { BadRequestError } from "../errors";

/**
 * Middleware to check if a user with the given username is already taken.
 */
export function checkUserAvailability() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    if (await isUsernameInDB(username)) {
      throw new BadRequestError(`username ${username} already exists in DB`);
    }

    next();
  };
}
