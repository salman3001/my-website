import { ConfirmEmailSchema } from "my-website.common/dtos/auth/confirmEmail.dto.js";
import { ForgotPasswordOtpSchema } from "my-website.common/dtos/auth/forgotPasswordOtp.dto.js";
import { LoginSchema } from "my-website.common/dtos/auth/login.dto.js";
import { RegisterSchema } from "my-website.common/dtos/auth/register.dto.js";
import { Router } from "express";
import { ResetPasswordSchema } from "my-website.common/dtos/auth/resetPassword.dto.js";
import { AuthService } from "my-website.services/auth.service.js";

const authController = Router();

authController.post("/login", async (req, res) => {
  const dto = LoginSchema.parse(req.body);
  const authService = req.scope.resolve<AuthService>("AuthService");
  const user = await authService.login(dto);

  const token = authService.getToken({
    tokenType: "auth",
    id: user.id,
    userType: user.userType,
    email: user.email,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userPayload } = user;

  return res.custom({
    data: { user: userPayload, token },
    code: 200,
    message: "Login Successfully",
    success: true,
  });
});

authController.post("/logout", async (req, res) => {
  return res.custom({
    code: 200,
    data: null,
    message: "Logout Successfully",
    success: true,
  });
});

authController.post("/register", async (req, res) => {
  const dto = RegisterSchema.parse(req.body);
  const authService = req.scope.resolve<AuthService>("AuthService");
  const user = await authService.register(dto);
  return res.custom({
    code: 200,
    message: "Account created. Please verify email",
    data: null,
    success: true,
  });
});

authController.post("/confirm-email", async (req, res) => {
  const dto = ConfirmEmailSchema.parse(req.body);
  const authService = req.scope.resolve<AuthService>("AuthService");
  const user = await authService.confirmEmail(dto);

  const token = authService.getToken({
    tokenType: "auth",
    id: user.id,
    userType: user.userType,
    email: user.email,
  });

  const { password, ...userPayload } = user;

  return res.custom({
    code: 200,
    message: "Account activated",
    data: { user: userPayload, token },
    success: true,
  });
});

authController.post("/forgot-password", async (req, res) => {
  const dto = ForgotPasswordOtpSchema.parse(req.body);
  const authService = req.scope.resolve<AuthService>("AuthService");
  await authService.forgotPasswordOtp(dto);

  return res.custom({
    code: 200,
    message: "OTP Sent",
    success: true,
  });
});

authController.post("/reset-password", async (req, res) => {
  const dto = ResetPasswordSchema.parse(req.body);
  const authService = req.scope.resolve<AuthService>("AuthService");
  const user = await authService.resetPassword(dto);

  return res.custom({
    code: 200,
    message: "Password reset successfully",
    data: user,
    success: true,
  });
});

export { authController };
