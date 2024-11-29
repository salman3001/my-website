import { User } from "my-website.data/generates/index.js";
import { BaseEvent } from "./base.event.js";

type AccountEventHandler = {
  emailChanged: (payload: User) => void;
};

export class AccountEvents extends BaseEvent<AccountEventHandler> {}
