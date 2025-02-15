// file: routes/sign-out.ts: This file defines the route for handling the "sign-out" endpoint.
import { Router, Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { setCurrentUser, checkAuth } from "../middlewares";
import { OkResponse } from "../responses";

// Initialize the router instance using express.Router()
const router = Router();

// Define the POST route for "/api/users/signout" which sends a simple message as the response
router.post(
  "/api/users/signOut",
  setCurrentUser,
  checkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    req.session = null;
    const response = new OkResponse(`user signed out`, req.currentUser, res);
    response.sendResponse();
  }
);

// Export the router so it can be used in other parts of the application
export { router as signOutRouter };
