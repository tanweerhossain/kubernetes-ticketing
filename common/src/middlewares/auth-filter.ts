import { NextFunction, Request, Response } from "express";

import { BadRequest } from "../errors/bad-request-error";
import { UnAuthorized } from "../errors/unauthorized-error";
import { verifyJWT } from "../services/jwt";
import "./custom-attributes-setting";

export const authFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.session?.jwt) throw new UnAuthorized();

  try {
    const payload = verifyJWT(req.session.jwt);

    const {
      id,
      email,
      iat
    } = payload as {
      id: string,
      email: string,
      iat: number
    };


    if (iat > Date.now()) throw new BadRequest('User doesn\'t exist');

    req.currentUserInfo = {
      id,
      email,
      password: ''
    };

    next();
  } catch (error: any) {
    // Clearing cookie session
    req.session = null;

    throw new UnAuthorized();
  }
};