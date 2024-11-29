import { AuthEvents } from "../events/auth.events.js";
import { IMailService } from "../mails/interface/ImailService.js";
import { Config } from "my-website.common/config/config.js";
import VerifyYourEmail from "../mails/templates/VerifyYourEmaill.js";
import ForgotPasswordEmail from "../mails/templates/ForgotPasswordEmail.js";
import { JwtUtils } from "my-website.common/utils/JwtUtils.js";
import { ContactMessageEvents } from "../events/contactMessage.events.js";
import NewContactMessageEmail from "../mails/templates/NewContactMessageEmail.js";
import { AccountEvents } from "../events/account.events.js";

export class MailNotificationService {
  constructor(
    private readonly authEvents: AuthEvents,
    private readonly contactMessageEvents: ContactMessageEvents,
    private readonly accountEvents: AccountEvents,
    private readonly mailService: IMailService,
    private readonly config: Config,
    private readonly jwtUtils: JwtUtils,
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

    this.accountEvents.on("emailChanged", async (user) => {
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
            subject: "Verify Your New Email -  " + this.config.envs.appName,
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

    // contact message created
    this.contactMessageEvents.on("messageCreated", (message) => {
      if (this.config.envs.nodeEnv === "production") {
        try {
          this.mailService.send({
            from: this.config.envs.emailFrom,
            to: "salman.k3001@gmail.com",
            subject:
              "New Contact Message recieved -" + this.config.envs.appName,
            react: () =>
              NewContactMessageEmail({
                email: message.email,
                message: message.message,
                phone: message.phone,
              }),
          });
        } catch (error) {
          console.error("Failed to send forgot password email");
        }
      } else {
        console.log("new message recieved", message);
      }
    });
  }
}
