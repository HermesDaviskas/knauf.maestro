import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import { RequestValidationError } from "../errors";

/**
 * Validator for sign-up data.
 * Ensures the username is at least 5 characters long and the password is at least 6 characters.
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
 * Validator for sign-in data.
 * Ensures username and password are provided.
 */
export const signIn: ValidationChain[] = [
  body("username").trim().notEmpty().withMessage("Username not provided"),
  body("password").trim().notEmpty().withMessage("Password not provided"),
];

/**
 * Middleware to validate request based on provided validator.
 */
export const validateRequest = (validator: ValidationChain[]) => {
  return [
    ...validator,
    (req: Request, res: Response, next: NextFunction) => {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        throw new RequestValidationError(validationErrors.array());

      next();
    },
  ];
};
