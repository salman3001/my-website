import * as nodemailer from "nodemailer";
import { render } from "@react-email/components";
import { IMailService } from "./interface/ImailService.js";
import { IMailSendProps } from "./interface/IMailSendProps.js";
import { Config } from "my-website.common/server/config/config.js";

export class NodeMailService implements IMailService {
  private transporter: nodemailer.Transporter;

  private readonly config: Config;

  constructor(opt: { Config: Config }) {
    this.config = opt.Config;
    this.transporter = nodemailer.createTransport({
      host: this.config.envs.smtpHost!,
      port: this.config.envs.smtpPort!,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: this.config.envs.smtpUser!,
        pass: this.config.envs.smtpPort!,
      },
    });
  }

  async send(sendProps: IMailSendProps) {
    const appName = this.config.envs.appName;
    const from = `admin@${appName}.com`;

    const emailHtml = await render(sendProps.react());
    try {
      await this.transporter.sendMail({
        from,
        to: sendProps.to,
        subject: sendProps.subject,
        html: emailHtml,
      });
    } catch (error) {
      console.log("Faled to send email : Error -", error);
    }
  }
}
