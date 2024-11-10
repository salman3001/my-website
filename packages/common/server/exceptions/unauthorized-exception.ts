import { CustomHttpException } from "./custom-http-exception.js";

export class UnAuthorizedException extends CustomHttpException {
  constructor(public message: string) {
    super(message, 401);
  }
}
