import { model, Schema } from "mongoose";
import { UserAttributesInterface } from "../interface/UserAttributesInterface";
import { UserDocInterface } from "../interface/UserDocInterface";
import { UserModelInterface } from "../interface/UserModelInterface";
import { userPlugins } from "./plugins";

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userPlugins(userSchema);

export const User = model<UserDocInterface, UserModelInterface>('User', userSchema);
