import { LeanDocument } from "mongoose";
import { DatabaseConnectionError } from "@tanweerhossain/common";
import { UserAttributesInterface } from "@tanweerhossain/common";
import { UserDocInterface } from "../interface/UserDocInterface";
import { User } from "../models/user";

export const isUserExist = async (
  email: string):
  Promise<boolean> => {
  try {
    const result:
      UserDocInterface |
      null = await User.findOne({ email });

    return !!result;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to search user email');
  }
};

export const createUser = async (
  { email, password }:
    UserAttributesInterface):
  Promise<LeanDocument<UserAttributesInterface> |
    null> => {
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

export const findUser = async (
  email: string):
  Promise<UserAttributesInterface |
    null> => {
  try {
    const userObject:
      UserDocInterface |
      null = await User.findOne({
        email
      }, {
        email: 1,
        password: 1
      });

    return userObject
      ? userObject.toJSON()
      : null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch user');
  }

};

export const isUserIdExist = async (
  id: string):
  Promise<boolean> => {
  try {
    const result:
      UserDocInterface |
      null = await User.findById(id);

    return !!result;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to search user email');
  }
};