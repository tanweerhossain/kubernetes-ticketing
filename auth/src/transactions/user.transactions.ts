import { LeanDocument } from "mongoose";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { UserAttributesInterface } from "../interface/UserAttributesInterface";
import { UserDocInterface } from "../interface/UserDocInterface";
import { User } from "../models/user";

export const isUserExist = async (email: string): Promise<boolean> => {
  try {
    const result: UserDocInterface | null = await User.findOne({ email });

    return !!result;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to search user email');
  }
};

export const createUser = async ({ email, password }: UserAttributesInterface): Promise<LeanDocument<UserAttributesInterface> | null> => {
  try {
    let result: UserDocInterface = User.build({ email, password });

    result = await result.save();

    if (!!result) {
      return result.toJSON();
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to create user email');
  }
};