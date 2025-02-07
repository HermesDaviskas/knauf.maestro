/**
 * @file routes/_index.ts
 *
 * This file acts as the entry point for all route definitions in the microservice.
 * It aggregates and exports all individual route modules so that they can be easily imported
 * in other parts of the application. By exporting them here, we provide a single access point for
 * all route configurations.
 *
 * Usage Example:
 *  - import * as routes from "./routes";               // Imports all routes as a single object
 *    app.use(routes.currentUserRouter);                // Use the route in the Express app
 *  - import { currentUserRouter } from "./routes";     // Imports individual route
 *    app.use(currentUserRouter);                       // Use the individual route in the Express app
 *
 * @exports GenericErrorParams                - Handles route related to the logged in user.
 * @exports RequestValidationErrorParams      - Handles route related to user sign-in.
 * @exports ErrorResponse      - Handles route related to user sign-in.
 *
 */

// Importing the individual route modules
import { ErrorConstructorParam } from "./ErrorConstructorParam";
import { ErrorResponseParam } from "./ErrorResponseParam";
import { RequestValidationErrorParams } from "./RequestValidationErrorParams";

// Re-exporting the modules for easy access from a single point.
export {
  ErrorConstructorParam,
  ErrorResponseParam,
  RequestValidationErrorParams,
};
