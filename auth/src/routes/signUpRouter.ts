/**
 * @file routes/sign-up.ts
 *
 * This file defines the route for handling the "sign-up" endpoint.
 * It uses express-validator to validate the user's email and password before processing the request.
 *
 * The following validation rules are applied:
 *  - The email must be a valid email format.
 *  - The password must be at least 6 characters long.
 */

import * as express from "express";
import { Request, Response, NextFunction } from "express";

import { signUpValidator } from "../controllers/validators";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../../../errorHandler/models";

const router = express.Router();

router.post(
  "/api/users/signup",
  signUpValidator,
  validationCheck,
  (req: Request, res: Response) => {
    res.send("auth micro-srv signup");
  }
);

function validationCheck(req: Request, res: Response, next: NextFunction) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty())
    throw new RequestValidationError({
      inService: "auth",
      inFunction: "signUpRouter",
      operationFailed: "User sign up failed",
    });
  next();
}

export { router as signUpRouter };
