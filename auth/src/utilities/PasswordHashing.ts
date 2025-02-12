/**
 * @file utilities/PasswordHashing.ts
 *
 * This file provides utility functions for hashing passwords and comparing them securely.
 * It uses the `crypto` module in Node.js to implement strong password hashing and verification
 * with the `scrypt` algorithm, a key derivation function designed for password hashing.
 *
 * Key Responsibilities:
 *  - Hashes passwords using a random salt to ensure uniqueness and security.
 *  - Compares a provided password with a stored hashed password.
 *  - Prevents timing attacks by using asynchronous functions.
 *
 * Usage Example:
 *
 * import { PasswordHashing } from "./utilities/PasswordHashing";
 *
 * Hashing a password
 * const hashedPassword = await PasswordHashing.toHash("userPassword");
 *
 * Comparing a provided password with the stored hashed password
 * const isValid = await PasswordHashing.isMatch("userPassword", storedHashedPassword);
 *
 */

import { scrypt, randomBytes } from "crypto"; // Importing cryptographic functions for hashing and random bytes generation
import { promisify } from "util"; // Importing promisify to convert callback-based functions to promises

// Promisifying the scrypt function for easier usage with async/await
const scryptAsync = promisify(scrypt);

/**
 * The PasswordHashing class provides methods for securely hashing and comparing passwords.
 * It uses the scrypt algorithm to hash passwords, which is designed to be computationally intensive
 * and resistant to brute-force attacks.
 */
export class PasswordHashing {
  /**
   * Hashes a given password using a random salt and the scrypt algorithm.
   * The password and the salt are combined and hashed to ensure uniqueness and
   * to make it more difficult for attackers to use precomputed hash tables (rainbow tables).
   *
   * @param password - The plain-text password to be hashed.
   * @returns A hashed password consisting of the hash and the salt, separated by a dot.
   *          Example format: "hashedPassword.salt"
   */
  static async toHash(password: string) {
    try {
      // Generate a random salt to add additional security to the hash
      const salt = randomBytes(16).toString("hex");

      // Use scrypt to generate a hash from the password and salt
      const buff = (await scryptAsync(password, salt, 128)) as Buffer;

      // Return the hashed password and salt as a combined string
      return `${buff.toString("hex")}.${salt}`;
    } catch (err) {
      // Error handling in case of failure in hashing
      throw new Error(`toHash(): ${err}`);
    }
  }

  /**
   * Compares a provided password with a stored hashed password to verify if they match.
   * The function splits the stored password into the hash and the salt, then hashes the provided
   * password using the same salt. The generated hash is then compared to the stored hash to verify
   * that the passwords match.
   *
   * @param providedPassword - The plain-text password to compare.
   * @param storedPassword - The previously stored password hash (including the salt).
   * @returns A boolean indicating whether the provided password matches the stored hashed password.
   */
  static async isMatch(providedPassword: string, storedPassword: string) {
    try {
      // Split the stored password into the hash and the salt
      const [hashedPassword, salt] = storedPassword.split(".");

      // Hash the provided password using the stored salt
      const buff = (await scryptAsync(providedPassword, salt, 128)) as Buffer;

      // Compare the generated hash with the stored hash
      return buff.toString("hex") === hashedPassword;
    } catch (err) {
      // Error handling in case of failure in password comparison
      throw new Error(`isMatch(): ${err}`);
    }
  }
}
