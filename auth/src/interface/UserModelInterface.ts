import { Model } from "mongoose";
import { UserAttributesInterface } from "./UserAttributesInterface";
import { UserDocInterface } from "./UserDocInterface";

export interface UserModelInterface extends Model<UserDocInterface> {
  build(attribute: UserAttributesInterface): UserDocInterface;
};