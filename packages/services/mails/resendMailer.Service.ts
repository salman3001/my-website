import { Resend } from "resend";
import { IMailService } from "./interface/ImailService.js";
import { IMailSendProps } from "./interface/IMailSendProps.js";
import { Config } from "my-website.common/server/config/config.js";

export class ResendMailService implements IMailService {
  private resend: Resend;
  private readonly config: Config;

  constructor(opt: { Config: Config }) {
    this.config = opt.Config;
    this.resend = new Resend(this.config.envs.resendKey);
  }

  async send(sendProps: IMailSendProps) {
    const appName = this.config.envs.appName;
    const from = `admin@${appName}.com`;
    try {
      await this.resend.emails.send({
        from,
        to: sendProps.to,
        subject: sendProps.subject,
        react: sendProps.react(),
      });
    } catch (error) {
      console.log("Faled to send email : Error -", error);
    }
  }
}
