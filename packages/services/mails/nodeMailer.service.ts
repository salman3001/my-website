import * as nodemailer from "nodemailer";
import { render } from "@react-email/components";
import { IMailService } from "./interface/ImailService.js";
import { IMailSendProps } from "./interface/IMailSendProps.js";
import { NodeMailerOptions } from "./interface/NodeMailerOptions.js";

export class NodeMailService implements IMailService {
  private transporter: nodemailer.Transporter;

  constructor(mailServiceOptions: NodeMailerOptions) {
    this.transporter = nodemailer.createTransport(mailServiceOptions);
  }

  async send(sendProps: IMailSendProps) {
    const emailHtml = await render(sendProps.react());
    try {
      await this.transporter.sendMail({
        from: sendProps.from,
        to: sendProps.to,
        subject: sendProps.subject,
        html: emailHtml,
      });
    } catch (error) {
      console.log("Faled to send email : Error -", error);
    }
  }
}
