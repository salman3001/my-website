import { AuthEvents } from "../events/auth.events.js";
import { IMailService } from "../mails/interface/ImailService.js";
import { Config } from "my-website.common/config/config.js";
import VerifyYourEmail from "../mails/templates/VerifyYourEmaill.js";
import ForgotPasswordEmail from "../mails/templates/ForgotPasswordEmail.js";
import { JwtUtils } from "my-website.common/utils/JwtUtils.js";

export class MailNotificationService {
  constructor(
    private authEvents: AuthEvents,
    private mailService: IMailService,
    private config: Config,
    private jwtUtils: JwtUtils,
  ) {}

  listen() {
    // user Signed up
    this.authEvents.on("userSignedup", async (user) => {
      const jwtToken = this.jwtUtils.signConfirmEmailToken({
        email: user.email,
        tokenType: "confirm-email",
      });

      const verifyUrl = `${this.config.envs.confirmEmailUrl}?jwt=${jwtToken}`;

      if (this.config.envs.nodeEnv === "production") {
        try {
          this.mailService.send({
            from: this.config.envs.emailFrom,
            to: user.email,
            subject: "Verify Your Email -  " + this.config.envs.appName,
            react: () =>
              VerifyYourEmail({
                userName: user.userName,
                verifyUrl: verifyUrl,
              }),
          });
        } catch (error) {
          console.error("Failed to send verification email");
        }
      } else {
        console.log(verifyUrl);
      }
    });

    // forgot password
    this.authEvents.on("userForgotPassword", (user) => {
      const jwtToken = this.jwtUtils.signForgotPasswordToken({
        id: user.id,
        tokenType: "reset-password",
      });

      const resetUrl = `${this.config.envs.resetPasswordUrl}?jwt=${jwtToken}`;

      if (this.config.envs.nodeEnv === "production") {
        try {
          this.mailService.send({
            from: this.config.envs.emailFrom,
            to: user.email,
            subject: "Verify Your Email -  " + this.config.envs.appName,
            react: () =>
              ForgotPasswordEmail({
                userName: user.userName,
                resetUrl,
              }),
          });
        } catch (error) {
          console.error("Failed to send forgot password email");
        }
      } else {
        console.log(resetUrl);
      }
    });
  }
}
