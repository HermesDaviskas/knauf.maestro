import mongoose from "mongoose";
// import { UserBuildArgs } from "./UserBuildArgs";

interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
}

interface UserBuildArgs {
  username: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(userModelArgs: UserBuildArgs): UserDoc;
}

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
userSchema.statics.build = (userBuildArgs: UserBuildArgs) => {
  return new User(userBuildArgs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
