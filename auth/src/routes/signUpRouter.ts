import { Router, Request, Response } from "express";
import { signUpValidator, validationCheck } from "../middlewares/validators";
import { UserCreatedResponse } from "../responses/UserCreatedResponse";

const router = Router();

router.post(
  "/api/users/signup",
  signUpValidator,
  validationCheck("auth", "signUpRouter", "Creating new user"),
  (req: Request, res: Response) => {
    new UserCreatedResponse(req, res).sendResponse();
  }
);

export { router as signUpRouter };
