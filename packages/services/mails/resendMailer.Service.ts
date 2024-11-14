import { Resend } from "resend";
import { IMailService } from "./interface/ImailService.js";
import { IMailSendProps } from "./interface/IMailSendProps.js";
import { MailServiceOptions } from "./interface/MailServiceOptions.js";

export class ResendMailService implements IMailService {
  private resend: Resend;

  constructor(mailServiceOptions: MailServiceOptions<"Resend">) {
    this.resend = new Resend(mailServiceOptions.adapterConfig.key);
  }

  async send(sendProps: IMailSendProps) {
    try {
      await this.resend.emails.send({
        from: sendProps.from,
        to: sendProps.to,
        subject: sendProps.subject,
        react: sendProps.react(),
      });
    } catch (error) {
      console.log("Faled to send email : Error -", error);
    }
  }
}
