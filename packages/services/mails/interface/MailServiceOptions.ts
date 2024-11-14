import { NodeMailerOptions } from "./NodeMailerOptions.js";
import { ResendOptions } from "./ResendOptions.js";

export class MailServiceOptions<Tadapter extends "Resend" | "NodeMailer"> {
  constructor(
    public adapter: Tadapter,
    public adapterConfig: Tadapter extends "NodeMailer"
      ? NodeMailerOptions
      : Tadapter extends "Resend"
      ? ResendOptions
      : {},
  ) {}
}
