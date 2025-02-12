/**
 * @file utilities/isUsernameInDB.ts
 *
 * This utility function checks whether a user with the given username exists in the database.
 * It queries the database using Mongoose and returns a boolean value indicating the existence
 * of the user. If an error occurs during the query, it throws a descriptive error to be handled
 * by the calling function.
 *
 * Usage Example:
 *  - import { isUsernameInDB } from "../utilities";
 *    const exists = await isUsernameInDB("exampleUser");
 *    if (exists) {
 *      console.log("User already exists.");
 *    }
 *
 * @param username - The username to check in the database.
 * @returns A Promise resolving to `true` if the user exists, otherwise `false`.
 * @throws Will throw an error if the database query fails.
 *
 * @exports isUsernameInDB - Function to check username existence in the database.
 */

import { User } from "../models/User";

export async function isUsernameInDB(username: string): Promise<boolean> {
  try {
    // Query the database to check if a user with the given username exists.
    // `User.exists({ username })` returns an object containing `_id` if a matching record is found,
    // otherwise, it returns `null`.
    const foundRecord = await User.exists({ username });

    // Convert the result to a boolean:
    // - If `foundRecord` is `null` (no matching user), `Boolean(null)` returns `false`.
    // - If a user is found, `Boolean(foundRecord)` returns `true`.
    return Boolean(foundRecord);
  } catch (err) {
    // If any error occurs during the database query, throw a new error with additional context.
    throw new Error(`isUsernameInDB(${username}): ${err}`);
  }
}
