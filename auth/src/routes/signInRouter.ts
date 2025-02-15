/**
 * @file routes/signInRouter.ts
 *
 * This file defines the route for user authentication. It validates the provided credentials,
 * ensures the user exists in the database, verifies the password, and generates a JWT token for
 * session management. Middleware is used to enforce data validation, check database connectivity,
 * and handle errors.
 *
 * Usage Example:
 *  - When a `POST` request is made to `/api/users/signin`, the following steps occur:
 *    1. **Validate sign-in data** using the `checkRequestValidation` middleware.
 *    2. **Ensure the database connection** is established using `checkDbConnection`.
 *    3. **Check if the user exists** in the database.
 *    4. **Verify the provided password** against the stored hash.
 *    5. **Generate a JWT token** and store it in the session.
 *    6. **Return a success response** with the authenticated user data.
 *    7. If any error occurs, it is automatically passed to the global error handler.
 *
 * @exports signInRouter - Handles user authentication by verifying credentials and issuing a JWT token.
 */

import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { checkRequestValidation, signIn } from "../middlewares/";
import { checkDbConnection } from "../middlewares/";
import { PasswordHashing } from "../utilities/";
import { User } from "../models/User";
import { OkResponse } from "../responses";
import { BadRequestError, UnauthorizedError } from "../errors";

const router = Router();

router.post(
  "/api/users/signin",

  // Middleware to validate request data based on the sign-in validation rules
  checkRequestValidation(signIn),

  // Middleware to ensure database connection is established
  checkDbConnection,

  // Main route handler for user authentication
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract username and password from the request body
      const { username, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ username });
      if (!user) throw new BadRequestError("User not found");

      // Verify the provided password against the stored hash
      if (!(await PasswordHashing.isMatch(password, user.password)))
        throw new UnauthorizedError("Invalid credentials");

      // Generate a JWT token and store it in the session
      const userJwt = jwt.sign(user.toJSON(), process.env.JWT_KEY!);
      req.session = { jwt: userJwt };

      // Send a success response with the authenticated user data
      const response = new OkResponse("User signed in", user.toJSON(), res);
      await response.sendResponse();
    } catch (err) {
      // Automatically pass the error to the global error handler
      next(err);
    }
  }
);

export { router as signInRouter };
