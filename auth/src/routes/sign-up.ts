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
import { Request, Response } from "express";

import { signUpValidator } from "../controllers/validators";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../../../errors/src/models/request-validation-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  signUpValidator,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError({
        inService: "auth",
        inFunction: "Router POST /api/users/signup ",
        fieldErrors: errors.array(),
        result: "User was not created",
      });
    }
    res.send("auth micro-srv signup");
  }
);

export { router as signUpRouter };
