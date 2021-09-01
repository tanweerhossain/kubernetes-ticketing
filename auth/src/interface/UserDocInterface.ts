import { Document } from "mongoose";

export interface UserDocInterface extends Document {
  email: string;
  password: string;
};