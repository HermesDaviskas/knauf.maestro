// file: src/controllers/validators.ts
import { body } from "express-validator";

/**
 * Validator for sign-up data.
 * Ensures the email is valid and password is at least 6 characters long.
 */
export const signUpValidator = [
  body("username")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long"),
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
//     throw new RequestValidationError({
//       inService: "auth",
//       inFunction: "signUp",
//       errorDesc: "User was not created",
//     });
//   }
//   next();
// };
