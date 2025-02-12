import mongoose from "mongoose";
import { PasswordHashing } from "../utilities"; // Utility for hashing passwords

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

// Pre-save middleware for hashing the password before saving the user document.
userSchema.pre("save", async function (done) {
  try {
    // Check if the password has been modified before hashing it
    if (this.isModified("password")) {
      // Hash the password using the PasswordHashing utility
      const hashed = await PasswordHashing.toHash(this.get("password"));

      // Set the hashed password to the document
      this.set("password", hashed);
    }
    done();
  } catch (err) {
    return done(new Error(`userSchema.pre("save"): ${err}`));
  }
});

/**
 * Adds a static `build` method to enforce type safety when creating new users.
 */
userSchema.statics.build = (userBuildArgs: UserBuildArgs) => {
  try {
    return new User(userBuildArgs);
  } catch (err) {
    throw new Error(`userSchema.statics.build(${userBuildArgs}): ${err}`);
  }
};

// Create the Mongoose model with the defined schema and interfaces.
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
