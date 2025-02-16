/**
 * @file __tests__/userModel.test.ts
 *
 * This file contains test cases for the User model, verifying functionality such as password hashing,
 * default values, custom static methods, and MongoDB schema transformations.
 *
 * Test Cases:
 *  - ✅ Successful User Creation: Ensures users are created with a hashed password and correct default values.
 *  - ✅ Password Hashing: Verifies that passwords are hashed before being stored.
 *  - ✅ Default `isBanned` Value: Tests that `isBanned` defaults to `false` if not provided.
 *  - ✅ Custom `build` Method: Ensures the custom `build` method works as expected.
 *  - ✅ `toJSON` Transformation: Verifies the transformation of sensitive information during serialization.
 *  - ✅ `pre-save` Hook: Ensures passwords are hashed before saving to the database.
 *
 * Usage:
 *  - Uses `supertest` and `mongoose` to interact with the MongoDB database and test model functionality.
 *  - Tests focus on verifying expected behavior for user creation, password handling, and transformation.
 */

import { User } from "../../models/User";
import mongoose from "mongoose";
import { PasswordHashing } from "../../utilities";

describe("User Model", () => {
  /**
   * ✅ Test Case: Successful User Creation
   *
   * This test verifies that a user can be created with the required fields (`username` and `password`),
   * and that the password is hashed before being stored in the database.
   */
  it("creates a new user with a hashed password", async () => {
    const user = await User.build({
      username: "testuser1",
      password: "password123",
    });

    // Save the user to trigger the pre-save hook
    await user.save();

    // Check that the password is hashed
    expect(user.password).not.toBe("password123");

    // Verify the password is correctly hashed
    (await PasswordHashing.isMatch("password123", user.password)) === true;
  });

  /**
   * ✅ Test Case: Default `isBanned` Value
   *
   * This test ensures that the `isBanned` field defaults to `false` if not explicitly provided when creating a user.
   */
  it("sets isBanned to false by default", async () => {
    const user = await User.build({
      username: "testuser2",
      password: "password123",
    });
    expect(user.isBanned).toBe(false); // Ensure default value for `isBanned` is false
  });

  /**
   * ✅ Test Case: Custom `build` Method
   *
   * This test ensures that the custom `build` method correctly creates a new user with the required fields,
   * including the default value for `isBanned` if not provided.
   */
  it("creates a user with the provided isBanned value", async () => {
    const user = await User.build({
      username: "testuser3",
      password: "password123",
      isBanned: true,
    });
    expect(user.isBanned).toBe(true); // Verify that `isBanned` was correctly set
  });

  /**
   * ✅ Test Case: `toJSON` Transformation
   *
   * This test ensures that sensitive information like `password`, `_id`, and `__v` are excluded
   * when a user is returned in JSON format. It also verifies that the `_id` field is transformed to `id`.
   */
  it("excludes password, _id, and __v when converting to JSON", async () => {
    const user = await User.build({
      username: "testuser4",
      password: "password123",
    });

    const userJson = user.toJSON();
    expect(userJson.password).toBeUndefined(); // Password should be excluded
    expect(userJson._id).toBeUndefined(); // _id should be excluded
    expect(userJson.__v).toBeUndefined(); // __v should be excluded
    expect(userJson.id).toBeDefined(); // _id should be transformed to id
  });

  /**
   * ✅ Test Case: `pre-save` Hook
   *
   * This test ensures that the `pre-save` hook hashes the password before saving the user document.
   */
  it("hashes the password before saving to the database", async () => {
    const user = new User({
      username: "testuser5",
      password: "password123",
    });

    await user.save(); // Save the user to trigger the pre-save hook

    // Check if the password is hashed
    const foundUser = await User.findById(user.id);
    expect(foundUser?.password).not.toBe("password123"); // Password should be hashed in the database
  });
});
