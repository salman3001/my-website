import { CustomHttpException } from "./custom-http-exception.js";

export class BadRequestException extends CustomHttpException {
  constructor(public message: string) {
    super(message, 400);
  }
}
