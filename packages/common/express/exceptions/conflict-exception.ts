import { CustomHttpException } from "./custom-http-exception.js";

export class ConflictException extends CustomHttpException {
  constructor(public message: string) {
    super(message, 409);
  }
}
