import { Request, Response } from "express";
import { BadRequest } from "../../../common//src/errors/bad-request-error";
import { UserAttributesInterface } from "../../../common/src/interface/UserAttributesInterface";
import { getJWT } from "../../../common/src/services/jwt";
import { Password } from "../services/password";
import { findUser } from "../transactions/user.transactions";

export const signinRouter = async (
  req: Request,
  res: Response): Promise<void> => {
  const { email, password }:
    UserAttributesInterface = req.body;

  const userObject:
    UserAttributesInterface |
    null = await findUser(email);

  if (!userObject) {
    throw new BadRequest('User is missing');
  }

  const {
    id,
    password: storedPassword }:
    UserAttributesInterface = userObject;

  let isAuthenticatedUser:
    boolean = false;

  if (!!storedPassword && !!password) {
    isAuthenticatedUser = await Password
      .compare(storedPassword, password);
  }

  if (!isAuthenticatedUser) {
    throw new BadRequest('Incorrect credentials');
  }

  req.session = {
    jwt: getJWT({
      id,
      email
    })
  };

  res.sendStatus(201);
};