import { ErrorResponse } from "../interface/ErrorResponse";
import { CustomError } from "./custom-error";

export class BadRequest extends CustomError {
  statusCode: number = 400;
  name: string = BadRequest.name;

  constructor(private reason: string) {
    super(reason);

    Object.setPrototypeOf(this, BadRequest.prototype);
  }

  serializeErrors(): ErrorResponse {
    return {
      errors: [{
        message: this.reason
      }]
    };
  }
}