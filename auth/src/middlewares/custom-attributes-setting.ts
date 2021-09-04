import { UserAttributesInterface } from "../interface/UserAttributesInterface";

declare global {
  namespace Express {
    interface Request {
      currentUserInfo?: UserAttributesInterface
    }
  }
};