/**
 * @file middlewares/index.ts
 *
 * This file serves as the central point for importing and exporting various
 * utility functions, middlewares, and validation rules used in the application.
 * By consolidating all imports and exports in this file, it simplifies the
 * management of middleware, validation logic, and error handling from a single location.
 *
 * Usage Example:
 *  - When setting up routes in the Express app, you can import the middlewares and validations from this central file:
 *    import { checkRequestValidation, signUp, signIn, checkUserAvailability, errorHandler } from "./middlewares";
 *
 *  - For defining a route with validation and user availability check:
 *    router.post("/api/users/signup",
 *      checkRequestValidation(signUp),        // Validates the request body using the sign-up rules
 *      checkUserAvailability(),               // Checks if the username already exists in the database
 *      async (req: Request, res: Response) => {
 *        Route handler logic for user creation
 *      }
 *    );
 *
 *  - For global error handling, add the `errorHandler` middleware after all routes:
 *    app.use(errorHandler);                   // Handles any errors that occur during the route processing
 *
 * @exports checkRequestValidation  - Middleware for validating request data based on defined validation rules.
 * @exports signUp                  - Validation rules specific to the sign-up process.
 * @exports signUp                  - Validation rules specific to the sign-up process.
 * @exports checkToken              - Checks if session token exists and if it is valid.
 * @exports checkUserAccess         - Checks if session token exists and if it is valid.
 * @exports checkUserAvailability   - Middleware to check if the username already exists in the database.
 * @exports grandAuth               - Sets currentUser to request
 * @exports errorHandler            - Global error handler middleware for managing application errors.
 */

import {
  checkRequestValidation,
  signUp,
  signIn,
} from "./checkRequestValidation";
import { checkUserAvailability } from "./checkUserAvailability";
import { checkToken } from "./checkToken";
import { checkUserAccess } from "./checkUserAccess";
import { checkDbConnection } from "./checkDbConnection";
import { setCurrentUser } from "./setCurrentUser";
import { checkAuth } from "./checkAuth";
import { errorHandler } from "./errorHandler";

// Exporting all middlewares and validations from this central file
export {
  checkRequestValidation,
  signUp,
  signIn,
  checkToken,
  checkUserAccess,
  checkDbConnection,
  checkUserAvailability,
  setCurrentUser,
  checkAuth,
  errorHandler,
};
