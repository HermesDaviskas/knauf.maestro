import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../errors";

/**
 * @file middlewares/checkToken.ts
 *
 * Middleware to check if a valid JWT token exists in the session.
 *
 * This middleware ensures that:
 *  1. A session token is present.
 *  2. The token is a valid JWT.
 *  3. If valid, the request is passed to the next middleware.
 *  4. If invalid or missing, an error is thrown.
 *
 * Usage:
 *  - Attach this middleware to any route requiring authentication.
 *  - Example: `router.get("/protected", checkToken, someHandler);`
 *
 * @throws {UnauthorizedError} If no session token exists.
 * @throws {UnauthorizedError} If the session token is invalid.
 */
export function checkToken(req: Request, res: Response, next: NextFunction) {
  // Ensure session and JWT exist
  if (!req.session?.jwt) throw new UnauthorizedError("No session token");

  try {
    // Verify the JWT and decode the payload
    jwt.verify(req.session.jwt, process.env.JWT_KEY!) as JwtPayload;
    // Proceed to the next middleware or route handler
    next();
  } catch {
    // Handle invalid JWT case
    throw new UnauthorizedError("Invalid session token");
  }
}
