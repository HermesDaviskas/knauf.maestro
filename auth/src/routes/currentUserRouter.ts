/**
 * @file routes/currentUserRouter.ts
 *
 * This file defines the route for checking the current user's session.
 * It validates if a valid JWT token exists in the session and, if valid, returns the current user's information.
 * The route uses middleware to ensure database connectivity and handles errors.
 *
 * Usage Example:
 *  - When a `POST` request is made to `/api/users/currentUser`, the following steps occur:
 *    1. **Ensure database connection** is established using `checkDbConnection`.
 *    2. **Check if the session JWT exists** in the request.
 *    3. **Verify the JWT token**.
 *    4. **Return the current user data** if the JWT is valid.
 *    5. If any error occurs, it is passed to the global error handler.
 *
 * @exports currentUserRouter - Handles checking the current user's session based on the JWT token in the session.
 */

import { Router, Request, Response, NextFunction } from "express";
import { setCurrentUser } from "../middlewares";
import { checkAuth } from "../middlewares";
import { OkResponse } from "../responses";

const router = Router();

router.get(
  "/api/users/currentUser",
  setCurrentUser,
  checkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const response = new OkResponse("current user", req.currentUser, res);
    response.sendResponse();
  }
);

export { router as currentUserRouter };
