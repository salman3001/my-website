import { ContactMessage, User } from "my-website.data/generates/index.js";
import { BaseEvent } from "./base.event.js";

type ContactMessageEventHandler = {
  messageCreated: (payload: ContactMessage) => void;
};

export class ContactMessageEvents extends BaseEvent<ContactMessageEventHandler> {}
