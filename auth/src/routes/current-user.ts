import { Request, Response } from "express";

export const currentUserRouter = (req: Request, res: Response): void => {
  res
    .status(200)
    .json({
      currentUser: {
        email: req.currentUserInfo?.email,
        id: req.currentUserInfo?.id
      }
    });
};