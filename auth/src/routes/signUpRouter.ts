import { Router, Request, Response } from "express";
import { signUpValidator } from "../middlewares/checkRequestValidation";
import { UserCreatedResponse } from "../responses/UserCreatedResponse";

//import { checkRequestValidness } from "../utilities/checkRequestValidness";
import { checkRequestValidation } from "../middlewares/checkRequestValidation";
import { checkUserExistence } from "../utilities/checkUserExistence";

import { NotFoundError } from "../errors/NotFoundError";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";

const router = Router();

router.post(
  "/api/users/signup",
  signUpValidator,
  checkRequestValidation,
  async (req: Request, res: Response) => {
    if (await checkUserExistence(req.body.username)) {
      throw new UserAlreadyExistsError();
    }

    new UserCreatedResponse(req, res).sendResponse();
  }
);

export { router as signUpRouter };
