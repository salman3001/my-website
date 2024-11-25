import { NodeMailerOptions } from "./NodeMailerOptions.js";
import { ResendOptions } from "./ResendOptions.js";

export type MailServiceOptions =
  | { adapter: "NodeMailer"; adapterConfig: NodeMailerOptions }
  | { adapter: "Resend"; adapterConfig: ResendOptions };

// export class MailServiceOptions<Tadapter extends MailServiceConfig["adapter"]> {
//   constructor(
//     public adapter: Tadapter,
//     public adapterConfig: Extract<
//       MailServiceConfig,
//       { adapter: Tadapter }
//     >["adapterConfig"],
//   ) {}
// }
