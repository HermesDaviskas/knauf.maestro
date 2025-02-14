import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";
import { UnauthorizedError } from "../errors";

/**
 * @file middlewares/checkUserAccess.ts
 *
 * Middleware to verify user access permissions.
 *
 * This middleware ensures that:
 *  1. A valid session JWT exists.
 *  2. The token is verified and decoded.
 *  3. The user associated with the token exists in the database.
 *  4. The user is not banned from accessing the system.
 *  5. If valid, the request is passed to the next middleware.
 *  6. If invalid, an `UnauthorizedError` is thrown.
 *
 * Usage:
 *  - Attach this middleware to protected routes requiring user authentication.
 *  - Example: `router.get("/dashboard", checkUserAccess, dashboardHandler);`
 *
 * @throws {UnauthorizedError} If no valid session token exists.
 * @throws {UnauthorizedError} If the user is not found or is banned.
 */
export async function checkUserAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Ensure the session contains a JWT
    if (!req.session || !req.session.jwt)
      throw new UnauthorizedError("No session token");

    // Retrieve JWT and secret key
    const jwt_value = req.session.jwt;
    const jwt_key = process.env.JWT_KEY!;

    // Verify and decode the JWT payload
    const payload = jwt.verify(jwt_value, jwt_key) as JwtPayload;

    // Find the user in the database
    const user = await User.findOne({ username: payload.username });

    // If user does not exist or is banned, deny access
    if (!user || user.isBanned)
      throw new UnauthorizedError("User access suspended");

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    next(err); // Pass error to global error handler
  }
}
