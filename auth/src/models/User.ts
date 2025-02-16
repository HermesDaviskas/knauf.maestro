/**
 * @file models/User.ts
 *
 * This file defines the Mongoose User model for handling user-related data in MongoDB.
 * It includes functionality such as password hashing, default field values, custom static methods,
 * and transformation logic for serializing user data.
 *
 * Key Functionalities:
 *  - Password Hashing: Ensures that user passwords are securely hashed before saving to the database.
 *  - Default `isBanned` Value: Ensures that the `isBanned` field defaults to `false` when creating a new user.
 *  - Custom `build` Method: Adds a custom static method for creating new users with required validation and defaults.
 *  - `toJSON` Transformation: Customizes the serialization of user data to exclude sensitive information.
 *  - `pre-save` Hook: Hashes the password before saving the user document to the database.
 *
 * Usage:
 *  - Uses Mongoose for defining the user schema, creating user documents, and interacting with the database.
 *  - Provides a static `build` method for type-safe user creation and handling password security.
 *  - Excludes sensitive information like password and MongoDB internal fields during serialization.
 */

import mongoose from "mongoose";
import { PasswordHashing } from "../utilities"; // Utility for hashing passwords

/**
 * Interface representing a User document in MongoDB.
 */
interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  isBanned: boolean;
}

/**
 * Interface defining the arguments required to create a new User.
 */
interface UserBuildArgs {
  username: string;
  password: string;
  isBanned?: boolean;
}

/**
 * Interface extending Mongoose's Model to include a custom static `build` method.
 */
interface UserModel extends mongoose.Model<UserDoc> {
  build(userModelArgs: UserBuildArgs): UserDoc;
}

// Define the Mongoose schema for the User model.
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true }, // Username is required for each user
    password: { type: String, required: true }, // Password is required and should be hashed
    isBanned: { type: Boolean, default: false }, // Default value of isBanned is false
  },
  {
    toJSON: {
      /**
       * Custom `toJSON` transformation logic for excluding sensitive data when serializing the user object.
       * - Transforms `_id` to `id`
       * - Removes password and `__v` fields from the serialized output.
       */
      transform(_doc, ret) {
        ret.id = ret._id; // Converts _id to id
        delete ret._id; // Removes _id from the response
        delete ret.password; // Removes password from the response to protect user security
        delete ret.__v; // Removes MongoDB version field
      },
    },
  }
);

/**
 * Pre-save middleware that hashes the password before saving a user document to the database.
 * This ensures that passwords are stored securely.
 */
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    this.set("password", await PasswordHashing.toHash(this.get("password"))); // Hash the password if modified
  }
  done(); // Proceed with saving the user document
});

/**
 * Adds a static `build` method to enforce type safety when creating new users.
 * This method ensures that the `isBanned` field defaults to `false` if not explicitly provided.
 */
userSchema.statics.build = (userBuildArgs: UserBuildArgs) => new User({ ...userBuildArgs, isBanned: userBuildArgs.isBanned ?? false }); // ✅ Ensure default `isBanned` value

// Create the Mongoose model with the defined schema and interfaces.
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
