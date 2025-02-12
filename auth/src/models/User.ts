/**
 * @file models/User.ts
 *
 * This file defines the Mongoose schema and model for the `User` entity.
 * It provides type safety through TypeScript interfaces and includes a static
 * factory method (`build`) to enforce consistent object creation.
 *
 * Usage Example:
 *  - Creating a new user:
 *    const user = User.build({ username: "john_doe", password: "securePass123" });
 *    await user.save();
 *
 * @exports User       - The Mongoose model representing users.
 * @exports UserDoc    - Interface representing a User document in MongoDB.
 */

import mongoose from "mongoose";

/**
 * Interface representing a User document in MongoDB.
 */
interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
}

/**
 * Interface defining the arguments required to create a new User.
 */
interface UserBuildArgs {
  username: string;
  password: string;
}

/**
 * Interface extending Mongoose's Model to include a custom static `build` method.
 */
interface UserModel extends mongoose.Model<UserDoc> {
  /**
   * Factory method to create a new User instance with type safety.
   * @param userModelArgs - The user properties to create a new User document.
   * @returns A new instance of the User model.
   */
  build(userModelArgs: UserBuildArgs): UserDoc;
}

// Define the Mongoose schema for the User model.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Adds a static `build` method to enforce type safety when creating new users.
 */
userSchema.statics.build = (userBuildArgs: UserBuildArgs) => {
  return new User(userBuildArgs);
};

// Create the Mongoose model with the defined schema and interfaces.
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
