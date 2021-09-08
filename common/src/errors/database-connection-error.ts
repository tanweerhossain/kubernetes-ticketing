import { CustomError } from "./custom-error";
import { ErrorResponse } from "../interface/ErrorResponse";

export class DatabaseConnectionError extends CustomError {
  name: string = DatabaseConnectionError.name;
  statusCode: number = 500;

  constructor(private reason: string) {
    super(DatabaseConnectionError.name);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): ErrorResponse {
    return {
      errors: [{
        message: this.reason
      }]
    };
  }
}