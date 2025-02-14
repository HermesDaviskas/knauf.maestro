/**
 * @file responses/index.ts
 *
 * This file serves as the entry point for all response classes.
 * It aggregates and exports all response modules to provide a single access point
 * for standardized API responses.
 *
 * Usage Example:
 *  - Import all response classes at once:
 *    import * as responses from "./responses";
 *    const response = new responses.CreatedResponse("User created", userData, res);
 *    response.sendResponse();
 *
 *  - Import individual response classes:
 *    import { CreatedResponse } from "./responses";
 *    new CreatedResponse("User created", userData, res).sendResponse();
 *
 * @exports CustomResponse    - Abstract base class for all custom responses.
 * @exports OkResponse        - Represents a generic response for successful operation (200 OK).
 * @exports CreatedResponse   - Represents a response for successful resource creation (201 Created).
 */

import { CustomResponse } from "./CustomResponse";
import { OkResponse } from "./OkResponse";
import { CreatedResponse } from "./CreatedResponse";

// Exporting response classes for easy access from a single entry point.
export { CustomResponse, OkResponse, CreatedResponse };
