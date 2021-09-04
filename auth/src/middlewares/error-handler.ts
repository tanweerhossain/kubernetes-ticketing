import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  if (err instanceof CustomError) {
    res.status(err.statusCode)
      .send(err.serializeErrors());

    return;
  }
  console.error(err);

  res.status(502).send({
    errors: {
      message: 'Please try later'
    }
  });
};