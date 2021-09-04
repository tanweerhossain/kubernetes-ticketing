import { ErrorResponse } from "../interface/ErrorResponse";
import { CustomError } from "./custom-error";

export class UnAuthorized extends CustomError {
  statusCode: number = 401;
  name: string = UnAuthorized.name;

  constructor() {
    super(UnAuthorized.name);

    Object.setPrototypeOf(this, UnAuthorized.prototype);
  }

  serializeErrors(): ErrorResponse {
    return {
      errors: [{
        message: 'Unauthorized access'
      }]
    };
  }
}