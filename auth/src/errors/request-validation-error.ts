import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
import { ErrorResponse } from "../interface/ErrorResponse";
import { DatabaseConnectionError } from "./database-connection-error";

export class RequestValidationError extends CustomError {
  name: string = RequestValidationError.name;
  statusCode: number = 400;

  constructor(private errors: ValidationError[]) {
    super(DatabaseConnectionError.name);

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): ErrorResponse {
    return {
      errors: this.errors.map(err => ({
        message: err.msg,
        field: err.param
      }))
    };
  }
}