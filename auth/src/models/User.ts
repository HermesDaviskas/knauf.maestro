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
  isBanned: boolean;
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
    username: { type: String, required: true },
    password: { type: String, required: true },
    isBanned: { type: Boolean, required: true },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// Pre-save middleware for hashing the password before saving the user document.
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    this.set("password", await PasswordHashing.toHash(this.get("password")));
  }
  done();
});

/**
 * Adds a static `build` method to enforce type safety when creating new users.
 */
userSchema.statics.build = (userBuildArgs: UserBuildArgs) =>
  new User(userBuildArgs);

// Create the Mongoose model with the defined schema and interfaces.
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
