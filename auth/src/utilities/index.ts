/**
 * @file utilities/index.ts
 *
 * This file serves as the entry point for all utility functions used in the application.
 * It aggregates and exports individual utility modules, allowing them to be easily imported
 * from a single location. By centralizing exports here, we ensure better maintainability
 * and cleaner imports throughout the codebase.
 *
 * Usage Example:
 *  - import * as utilities from "../utilities";       // Imports all utilities as a single object
 *    const exists = await utilities.isUsernameInDB("exampleUser");
 *  - import { isUsernameInDB } from "../utilities";  // Imports a specific utility function
 *    const exists = await isUsernameInDB("exampleUser");
 *
 * @exports isUsernameInDB - Utility function to check if a username exists in the database.
 */

// Importing individual utility functions
import { isUsernameInDB } from "./isUsernameInDB";

// Re-exporting utility functions for centralized access
export { isUsernameInDB };
