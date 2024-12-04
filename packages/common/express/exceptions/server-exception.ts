import { CustomHttpException } from "./custom-http-exception.js";

export class ServerException extends CustomHttpException {
  constructor(public message: string) {
    super(message, 500);
  }
}
