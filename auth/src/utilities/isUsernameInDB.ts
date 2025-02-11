import { User } from "../models/User";

/**
 * Checks if a user with the given username exists in the database.
 * @param username - The username to check.
 * @returns A Promise resolving to `true` if the user exists, otherwise `false`.
 */

export async function isUsernameInDB(username: string): Promise<boolean> {
  try {
    const result = Boolean(await User.exists({ username }));
    return result;
  } catch (err) {
    throw new Error(`error in function isUsernameInDB(${username}). ${err}`);
  }
}
