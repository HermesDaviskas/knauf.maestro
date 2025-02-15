/**
 * @file middlewares/setCurrentUser.ts
 *
 * This middleware is responsible for setting the current user in the request object
 * based on the JWT stored in the session. It verifies the JWT, decodes the payload,
 * and attaches the user information to `req.currentUser`.
 *
 * Usage Example:
 *  - This middleware is used in routes where user identification is necessary.
 *  - It checks if a JWT exists in the session and decodes it to set the current user.
 *  - If no valid JWT is found or the JWT verification fails, the request proceeds without setting a user.
 *
 * @exports setCurrentUser - Middleware to set the current user from a JWT stored in the session.
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define the interface for the decoded JWT payload
interface UserPayload {
  id: string;
  username: string;
  isBanned: boolean;
}

// Extend Express Request to include the `currentUser` property
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

/**
 * Middleware function to set the `currentUser` in the request based on the JWT session.
 */
export const setCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the JWT exists in the session, otherwise proceed
  if (!req.session?.jwt) return next();

  try {
    // Extract JWT from the session and verify it
    const jwtSession = req.session.jwt;
    const jwtKey = process.env.JWT_KEY!; // JWT secret key
    const payload = jwt.verify(jwtSession, jwtKey) as UserPayload;

    // Set the current user on the request object if JWT is valid
    req.currentUser = payload;
  } catch (err) {
    // If JWT verification fails, proceed without setting the user
    return next();
  }

  // Move to the next middleware or route handler
  next();
};
