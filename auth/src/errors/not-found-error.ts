import { ErrorResponse } from "../interface/ErrorResponse";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  name: string = NotFoundError.name;

  constructor() {
    super(NotFoundError.name);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): ErrorResponse {
    return {
      errors: [{
        message: 'Not Found'
      }]
    };
  }
}