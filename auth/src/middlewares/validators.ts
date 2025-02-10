import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/RequestValidationError";

/**
 * Validator for sign-up data.
 * Ensures the username is at least 5 characters long and the password is at least 6 characters.
 */
export const signUpValidator = [
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
 * Custom validation error handler that sends a structured response.
 */
export function validationCheck(
  inService: string,
  inFunction: string,
  inOperation: string
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new RequestValidationError({
        errorTriggers: validationErrors.array(),
        inService,
        inFunction,
        inOperation,
      });
    }
    next();
  };
}
