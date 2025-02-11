import mongoose from "mongoose";
// import { UserBuildArgs } from "./UserBuildArgs";

interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  // Args automatically created by mongooseDB:
  // createdAt: string; // uncomment if needed
  // updatedAt: string; // uncomment if needed
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(userModelArgs: UserBuildArgs): UserDoc;
}

interface UserBuildArgs {
  username: string;
  password: string;
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

const user = User.build({
  username: "ermis",
  password: "12345678",
});

export { User };
