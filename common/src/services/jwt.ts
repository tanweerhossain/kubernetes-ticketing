import { JwtPayload, sign, verify } from "jsonwebtoken";

export const getJWT = (
  object: any):
  string => sign(object,
    process.env.JWT_KEY!
  );
export const verifyJWT = (
  token: string):
  JwtPayload | string => verify(token,
    process.env.JWT_KEY!
  );