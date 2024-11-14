import { CustomHttpException } from "./custom-http-exception.js";

export class UnProcessableEntityException extends CustomHttpException {
  constructor(public message: string) {
    super(message, 403);
  }
}
