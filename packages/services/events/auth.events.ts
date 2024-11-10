import { User } from "my-website.data/generates/index.js";
import { EventEmitter } from "node:events";

export class AuthEvents {
  private eventEmitter: EventEmitter;
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on("user:signedup", this.hanndleUserSignedUp);
    this.eventEmitter.on(
      "user:forgot-password",
      this.hanndleUserForgotPassword,
    );
  }

  emitUserSignedUp(user: User) {
    this.eventEmitter.emit("user:signedup", user);
  }

  private async hanndleUserSignedUp(user: User) {}

  emitUserForgotPassword(user: User) {
    this.eventEmitter.emit("user:forgot-password", user);
  }

  private async hanndleUserForgotPassword(user: User) {}
}
