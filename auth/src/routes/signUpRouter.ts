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

import { signUpValidator, validationCheck } from "../middlewares/validators";
import { successResponseParam } from "../../interfaces/successResponseParam";

const router = express.Router();

router.post(
  "/api/users/signup",
  signUpValidator,
  validationCheck("auth", "signUpRouter", "Creating new user"),
  (req: Request, res: Response) => {
    const response: successResponseParam = {
      success: true,
      inOperation: "Creating new user",
      data: [
        {
          username: req.body.username,
          password: req.body.password,
        },
      ],
    };
    res.send(response);
  }
);

export { router as signUpRouter };
