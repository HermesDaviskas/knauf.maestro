/**
 * @file middlewares/checkUserAvailability.ts
 *
 * This file defines middleware for checking if a user with the given username
 * already exists in the database. It ensures usernames are unique before allowing
 * user creation.
 *
 * @exports checkUserAvailability - Middleware that checks if a username is already taken.
 */

import { Request, Response, NextFunction } from "express";
import { isUsernameInDB } from "../utilities";
import { BadRequestError, InternalServerError } from "../errors";

/**
 * Checks if the username is available by querying the database.
 * If the username already exists, passes a BadRequestError to the next error handler.
 * If an error occurs during the query, it passes an InternalServerError.
 *
 * @returns Express middleware function that checks username availability.
 */
export function checkUserAvailability() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    try {
      // Check if the username exists in the database
      const usernameTaken = await isUsernameInDB(username);

      if (usernameTaken) {
        // If the username is taken, pass a BadRequestError to the next error handler
        return next(
          new BadRequestError(`Username ${username} already exists in DB`)
        );
      }

      // Proceed to the next middleware if no errors
      next();
    } catch (err) {
      // Pass an InternalServerError to the next error handler
      return next(
        new InternalServerError(`checkUserAvailability(${username}): ${err}`)
      );
    }
  };
}
