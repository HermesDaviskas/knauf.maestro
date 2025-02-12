import { Router, Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors";

/**
 * @file routes/defaultRouter.ts
 *
 * This file defines a catch-all route for handling unmatched requests.
 * If no defined route matches an incoming request, this router ensures a
 * proper 404 response is returned.
 *
 * Key Responsibilities:
 *  - Catch all unmatched routes.
 *  - Throw a `NotFoundError` to be handled by the global error handler.
 *
 * Usage Example:
 *  - If a request is made to an undefined route, this middleware will intercept it
 *    and return a `NotFoundError`, ensuring consistent error handling.
 *
 * @exports Default Router - Handles unmatched routes by throwing a 404 error.
 */

const router = Router();

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`The URL ${req.url} was not found.`));
});

export { router as defaultRouter };
