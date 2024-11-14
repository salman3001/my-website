import { CustomHttpException } from "./custom-http-exception.js";

export class NotFoundException extends CustomHttpException {
  constructor(public message: string) {
    super(message, 404);
  }
}
