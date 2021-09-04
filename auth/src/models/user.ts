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
}, {
  toJSON: {
    transform(doc: any, ret: any) {
      // Changing _id -> id
      ret.id = ret._id;
      delete ret._id;

      // Removing password to access
      // delete ret.password;

      // versionKey OR delete ret.__v;
    },
    versionKey: false
  }
});

userPlugins(userSchema);

export const User = model<UserDocInterface, UserModelInterface>('User', userSchema);
