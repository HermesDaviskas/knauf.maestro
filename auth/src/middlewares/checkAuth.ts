/**
 * @file middlewares/checkAuth.ts
 *
 * This middleware checks if a user is authenticated by verifying that the `currentUser`
 * is set on the request object. If the `currentUser` is not set, it throws an UnauthorizedError,
 * preventing access to the requested resource.
 *
 * Usage Example:
 *  - This middleware is used in routes that require user authentication.
 *  - It ensures that only authenticated users can access protected routes.
 *  - If the user is not authenticated, it throws an error and prevents further execution.
 *
 * @exports checkAuth - Middleware to ensure that the user is authenticated before accessing protected resources.
 */

import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors";

/**
 * Middleware to check if the user is authenticated.
 * If the user is not authenticated, throws an UnauthorizedError.
 */
export function checkAuth(req: Request, res: Response, next: NextFunction) {
  // If the user is not authenticated (currentUser is not set), throw an UnauthorizedError
  if (!req.currentUser) throw new UnauthorizedError("user is not signed in");

  // Proceed to the next middleware or route handler if the user is authenticated
  next();
}
