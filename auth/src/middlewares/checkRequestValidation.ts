/**
 * @file middlewares/checkRequestValidation.ts
 *
 * This file defines validation rules and a middleware function for validating incoming requests.
 * It ensures that user input for sign-up and sign-in processes meets the required constraints.
 *
 * Usage Example:
 *  - Applying validation in a route:
 *    router.post("/api/users/signup", checkRequestValidation(signUp), async (req, res) => { ... });
 *
 * @exports signUp                 - Validation rules for user sign-up.
 * @exports signIn                 - Validation rules for user sign-in.
 * @exports checkRequestValidation - Middleware to enforce validation rules on requests.
 */

import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import { RequestValidationError } from "../errors";

/**
 * Validation rules for user sign-up.
 * - Username must be at least 5 characters long.
 * - Password must be at least 6 characters long.
 */
export const signUp: ValidationChain[] = [
  body("username")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

/**
 * Validation rules for user sign-in.
 * - Username is required.
 * - Password is required.
 */
export const signIn: ValidationChain[] = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

/**
 * Middleware to validate incoming requests based on the provided validation rules.
 * If validation fails, it throws a `RequestValidationError`, which should be handled
 * by an error-handling middleware.
 *
 * @param validator - An array of validation rules to apply.
 * @returns Express middleware function enforcing validation.
 */
export const checkRequestValidation = (validator: ValidationChain[]) => {
  return [
    // Perform the selected validator checks
    ...validator,

    (req: Request, res: Response, next: NextFunction) => {
      // Check if validation errors occured
      const errors = validationResult(req);

      // If validation errors exist, call error-handling middleware,
      // else proceed to the next middleware
      if (!errors.isEmpty())
        return next(new RequestValidationError(errors.array()));
      else next();
    },
  ];
};
