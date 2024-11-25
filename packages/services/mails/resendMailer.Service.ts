import { Resend } from "resend";
import { IMailService } from "./interface/ImailService.js";
import { IMailSendProps } from "./interface/IMailSendProps.js";
import { ResendOptions } from "./interface/ResendOptions.js";

export class ResendMailService implements IMailService {
  private resend: Resend;

  constructor(mailServiceOptions: ResendOptions) {
    this.resend = new Resend(mailServiceOptions.key);
  }

  async send(sendProps: IMailSendProps) {
    try {
      const res = await this.resend.emails.send({
        from: sendProps.from,
        to: sendProps.to,
        subject: sendProps.subject,
        react: sendProps.react(),
      });
      console.log(res);
    } catch (error) {
      console.log("Faled to send email : Error -", error);
    }
  }
}
