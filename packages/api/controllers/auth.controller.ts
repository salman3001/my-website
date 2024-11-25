import { ConfirmEmailSchema } from "my-website.common/dtos/auth/confirmEmail.dto.js";
import { ForgotPasswordOtpSchema } from "my-website.common/dtos/auth/forgotPasswordOtp.dto.js";
import { LoginSchema } from "my-website.common/dtos/auth/login.dto.js";
import { RegisterSchema } from "my-website.common/dtos/auth/register.dto.js";
import { Controller, Request, Response } from "my-website.common/express";
import { ResetPasswordSchema } from "my-website.common/dtos/auth/resetPassword.dto.js";
import { AuthService } from "my-website.services/auth.service.js";
import { ResendVerificationEmailSchema } from "my-website.common/dtos/auth/resendVerificationEmail.dto.js";

export class AuthController extends Controller {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async login(req: Request, res: Response) {
    const dto = LoginSchema.parse(req.body);

    const { user, token } = await this.authService.login(dto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userPayload } = user;

    return res.custom({
      data: { user: userPayload, token },
      code: 200,
      message: "Login Successfully",
      success: true,
    });
  }

  async logout(req: Request, res: Response) {
    return res.custom({
      code: 200,
      data: null,
      message: "Logout Successfully",
      success: true,
    });
  }

  async register(req: Request, res: Response) {
    const dto = RegisterSchema.parse(req.body);

    const user = await this.authService.register(dto);
    return res.custom({
      code: 200,
      message: "Account created. Please verify email",
      data: null,
      success: true,
    });
  }

  async confirmEmail(req: Request, res: Response) {
    const dto = ConfirmEmailSchema.parse(req.body);

    const { user, token } = await this.authService.confirmEmail(dto);

    const { password, ...userPayload } = user;

    return res.custom({
      code: 200,
      message: "Account activated",
      data: { user: userPayload, token },
      success: true,
    });
  }

  async resendVerificiationEmail(req: Request, res: Response) {
    const dto = ResendVerificationEmailSchema.parse(req.body);

    await this.authService.resendVerificiationEmail(dto);

    return res.custom({
      code: 200,
      message: "Email Sent! please check your inbox",
      success: true,
    });
  }

  async forgotPassword(req: Request, res: Response) {
    const dto = ForgotPasswordOtpSchema.parse(req.body);

    await this.authService.forgotPasswordOtp(dto);

    return res.custom({
      code: 200,
      message: "OTP Sent",
      success: true,
    });
  }

  async resetPassword(req: Request, res: Response) {
    const dto = ResetPasswordSchema.parse(req.body);

    const user = await this.authService.resetPassword(dto);

    return res.custom({
      code: 200,
      message: "Password reset successfully",
      data: user,
      success: true,
    });
  }
}
