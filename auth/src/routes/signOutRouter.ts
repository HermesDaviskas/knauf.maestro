/**
 * @file routes/signOutRouter.ts
 *
 * This file defines the route for user sign-out. It clears the session and sends a success response
 * indicating the user has been logged out. The middleware ensures that the current user is set
 * and that authentication is checked before proceeding.
 *
 * Usage Example:
 *  - When a `POST` request is made to `/api/users/signout`, the following steps occur:
 *    1. **Set the current user** based on session or request data using `setCurrentUser`.
 *    2. **Ensure the user is authenticated** using `checkAuth`.
 *    3. **Clear the session** to log the user out.
 *    4. **Return a success response** indicating the user has been signed out.
 *    5. If any error occurs, it is automatically passed to the global error handler.
 *
 * @exports signOutRouter - Handles user sign-out by clearing the session and sending a success response.
 */

import { Router, Request, Response, NextFunction } from "express";
import { setCurrentUser, checkAuth } from "../middlewares";
import { OkResponse } from "../responses";

// Initialize the router instance using express.Router()
const router = Router();

// Define the POST route for "/api/users/signout"
router.post(
  "/api/users/signOut",

  // Middleware to set the current user based on the session or request
  setCurrentUser,

  // Middleware to check if the user is authenticated
  checkAuth,

  // Main route handler for user sign-out
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Clear the session to sign out the user
      req.session = null;

      // Create a success response indicating the user has signed out
      const response = new OkResponse(`User signed out`, req.currentUser, res);
      await response.sendResponse();
    } catch (err) {
      // Automatically pass the error to the global error handler
      return next(err);
    }
  }
);

// Export the router so it can be used in other parts of the application
export { router as signOutRouter };
