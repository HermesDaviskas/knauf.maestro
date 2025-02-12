import { Router, Request, Response, NextFunction } from "express";

import { checkRequestValidation, signUp } from "../middlewares/";
import { checkDbConnection, checkUserAvailability } from "../middlewares/";

import { User } from "../models/User";
import { CreatedResponse } from "../responses";

/**
 * @file routes/userRoutes.ts
 *
 * This file defines the route for user sign-up. It applies validation and
 * checks for the availability of the username before proceeding with the
 * user creation process. The route uses middleware to ensure proper data
 * validation and error handling before and after the main operation.
 *
 * Usage Example:
 *  - When a POST request is made to `/api/users/signup`, the following sequence of operations occurs:
 *    1. Validate the sign-up data using the `checkRequestValidation` middleware.
 *    2. Check if the username is available using the `checkUserAvailability` middleware.
 *    3. If both steps pass, the user is created and a success response is sent.
 *    4. If an error occurs at any stage, it is handled by the global error handler.
 *
 * @exports User Sign-Up Route   - Handles user sign-up by validating request, checking username availability, and creating a new user.
 */

const router = Router();

router.post(
  "/api/users/signup",

  // Middleware to validate request data based on the sign-up validation rules
  checkRequestValidation(signUp),

  // Middleware to check if connection to DB is established
  checkDbConnection,

  // Middleware to check if the username is already taken
  checkUserAvailability,

  // Main route handler for user sign-up
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Destructure username and password from the request body
      const { username, password } = req.body;

      // Create a new user instance using the provided data and save to the database
      const user = User.build({ username, password });
      await user.save();

      // Create a response object to send back a success message and the created user data
      const response = new CreatedResponse("user created", user, res);
      await response.sendResponse();
    } catch (err) {
      // If an error occurs, forward it to the global error handler
      return next(new Error(`Error while recording user in DB: ${err}`));
    }
  }
);

export { router as signUpRouter };
