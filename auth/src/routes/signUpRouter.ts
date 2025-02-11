import { Router, Request, Response } from "express";

import { validateRequest, signUp } from "../middlewares/";
import { checkUserAvailability } from "../middlewares/";

import { User } from "../models/User";
import { CreatedResponse } from "../responses";

const router = Router();

router.post(
  "/api/users/signup",
  validateRequest(signUp),
  checkUserAvailability(),

  async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = User.build({ username, password });
      await user.save();
      const response = new CreatedResponse("user created", user, res);
      await response.sendResponse();

      new CreatedResponse("user created", user, res).sendResponse();
    } catch (err) {
      throw new Error(`error while recording user in DB. ${err}`);
    }
  }
);

export { router as signUpRouter };
