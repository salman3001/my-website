import { User } from "my-website.data/generates/index.js";
import { BaseEvent } from "./base.event.js";

type AuthEventHandler = {
  userSignedup: (payload: User) => void;
  userForgotPassword: (payload: User) => void;
};

export class AuthEvents extends BaseEvent<AuthEventHandler> {}
