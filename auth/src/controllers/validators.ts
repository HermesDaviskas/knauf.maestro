// file: src/controllers/validators.ts
import { Request, Response, NextFunction } from "express";
const { body, validationResult } = require("express-validator");

/**
 * Validator for sign-up data.
 * Ensures the email is valid and password is at least 6 characters long.
 */
export const signUpValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long"),
];

/**
 * Custom validation error handler that sends a structured response.
 */
// export const handleValidation = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new Error('{"type": "error", "message": "Something went wrong!"}');
//   }
//   next();
// };
