import { Model } from "mongoose";
import { UserAttributesInterface } from "../../../common/src/interface/UserAttributesInterface";
import { UserDocInterface } from "./UserDocInterface";

export interface UserModelInterface extends Model<UserDocInterface> {
  build(attribute: UserAttributesInterface): UserDocInterface;
};