import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import { BadRequest } from "../errors/bad-request-error";
import { UserAttributesInterface } from "../../../common/src/interface/UserAttributesInterface";
import { createUser, isUserExist } from "../transactions/user.transactions";

export const signupRouter = async (
  req: Request,
  res: Response): Promise<void> => {
  const { email, password }:
    UserAttributesInterface = req.body;

  const isUserExistBoolean:
    boolean = await isUserExist(email);

  if (isUserExistBoolean) {
    throw new BadRequest('User already exist');
  }

  let createdUserObject:
    LeanDocument<UserAttributesInterface> |
    null = await createUser({ email, password });

  if (!createdUserObject) {
    throw new BadRequest('User creation failed');
  }

  res.sendStatus(201);
};