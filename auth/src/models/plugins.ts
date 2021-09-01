import { Schema } from "mongoose";
import { UserAttributesInterface } from "../interface/UserAttributesInterface";
import { UserDocInterface } from "../interface/UserDocInterface";
import { Password } from "../services/password";
import { User } from "./user";

export const userPlugins = (userSchema: Schema): void => {
  userSchema.statics.build = (attributes: UserAttributesInterface): UserDocInterface => new User(attributes);

  userSchema.pre('save', async function (done): Promise<void> {
    if (this.isModified('password')) {
      const hashedPassword: string = await Password.toHash(this.get('password'));
      this.set('password', hashedPassword);
    }
    done();
  })
}