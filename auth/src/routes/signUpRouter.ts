/**
 * @file routes/signUpRouter.ts
 *
 * This file defines the route for user sign-up. It validates the provided request data, checks if
 * the username is already in use, and creates a new user if all conditions are met. The route utilizes
 * middleware for request validation, database connection verification, and error handling.
 *
 * Usage Example:
 *  - When a `POST` request is made to `/api/users/signup`, the following sequence of operations occurs:
 *    1. **Validate sign-up data** using the `checkRequestValidation` middleware.
 *    2. **Ensure the database connection** is established using `checkDbConnection`.
 *    3. **Check if the username is already taken** using `isUsernameInDB`.
 *    4. If the username is available, **create a new user** and save it to the database.
 *    5. **Return a success response** with the newly created user data.
 *    6. If any error occurs, it is passed to the global error handler.
 *
 * @exports signUpRouter - Handles user registration by validating request data, checking username availability, and creating a new user.
 */

import { Router, Request, Response, NextFunction } from "express";

import { checkRequestValidation, signUp } from "../middlewares/";
import { checkDbConnection } from "../middlewares/";
import { isUsernameInDB } from "../utilities/";
import { User } from "../models/User";
import { CreatedResponse } from "../responses";
import { BadRequestError } from "../errors";

const router = Router();

router.post(
  "/api/users/signup",

  // Middleware to validate request data based on the sign-up validation rules
  checkRequestValidation(signUp),

  // Middleware to ensure the database connection is established
  checkDbConnection,

  // Main route handler for user sign-up
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Destructure username and password from the request body
      const { username, password, isBanned } = req.body;

      // Check if the username is already taken
      if (await isUsernameInDB(username))
        throw new BadRequestError("User already exists");

      // Create a new user instance using the provided data and save it to the database
      const user = User.build({ username, password, isBanned });
      await user.save();

      // Create a response object to send back a success message and the created user data
      const response = new CreatedResponse("User created", user.toJSON(), res);
      await response.sendResponse();
    } catch (err) {
      // Handle specific errors by passing them to the global error handler
      if (err instanceof BadRequestError)
        return next(
          new BadRequestError(`Error during user sign-up: ${err.message}`)
        );
      // Handle any unexpected errors
      else
        return next(new Error(`Unexpected error during user sign-up: ${err}`));
    }
  }
);

export { router as signUpRouter };
