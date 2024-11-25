import { config } from "dotenv";
import { join } from "node:path";

export class Config {
  constructor() {
    config({ path: join(process.cwd(), ".env") });
    this.validate();
  }

  get envs() {
    return {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT as unknown as number,
      appName: process.env.APP_NAME,
      appUrl: process.env.APP_URL,
      appSecrete: process.env.APP_SECRETE,
      frontUrl: process.env.FRONT_URL,
      confirmEmailUrl: process.env.CONFIRM_EMAIL_URL,
      resetPasswordUrl: process.env.RESET_PASSWORD_URL,
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT,
      smtpUser: process.env.SMTP_USER,
      smtpPass: process.env.SMTP_PASS,
      resendKey: process.env.RESEND_KEY,
      emailFrom: process.env.EMAIL_FROM!,
      uploadsPath: process.env.UPLOADS_PATH,
    };
  }

  private validate() {
    for (const key in this.envs) {
      if (Object.prototype.hasOwnProperty.call(this.envs, key)) {
        const element = this.envs[key as keyof typeof this.envs];
        if (!element) {
          throw new Error(`Environment variable "${key}" is not defined`);
        }
      }
    }
  }

  get nodeMailerConfig() {
    return {
      host: this.envs.smtpHost!,
      port: this.envs.smtpPort! as unknown as number,
      secure: true,
      auth: {
        user: this.envs.smtpUser!,
        pass: this.envs.smtpPass!,
      },
    };
  }

  get resendConfig() {
    return {
      key: this.envs.resendKey!,
    };
  }
}
