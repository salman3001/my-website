import { CustomHttpException } from "./custom-http-exception.js";

export class ForbiddenException extends CustomHttpException {
  constructor(public message: string) {
    super(message, 403);
  }
}
