import { AuthController } from "controllers/auth.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const authRoutes = Router();

authRoutes.post("/login", useController(AuthController, "login"));
authRoutes.post("/google-login", useController(AuthController, "googleLogin"));
authRoutes.post("/logout", useController(AuthController, "logout"));
authRoutes.post("/register", useController(AuthController, "register"));
authRoutes.post(
  "/confirm-email",
  useController(AuthController, "confirmEmail"),
);

authRoutes.post(
  "/resend-verification-email",
  useController(AuthController, "resendVerificiationEmail"),
);
authRoutes.post(
  "/forgot-password",
  useController(AuthController, "forgotPassword"),
);
authRoutes.post(
  "/reset-password",
  useController(AuthController, "resetPassword"),
);

export { authRoutes };
