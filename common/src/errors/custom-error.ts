import { ErrorResponse } from "../interface/ErrorResponse";

export abstract class CustomError extends Error {
  abstract name: string;
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): ErrorResponse;
};