import { Request, Response } from "express";

export const signoutRouter = (req: Request, res: Response): void => {
  req.session = null;

  res.sendStatus(200);
};