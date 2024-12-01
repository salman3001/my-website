import { AccountController } from "controllers/account.controller.js";
import { Router, useController } from "my-website.common/express/index.js";
import { MulterSingleFile } from "my-website.common/express/middlewares/multer-single-file.middleware.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { AuthenticatedOnly } from "policies/AuthenticatedOnly.js";

const accountRoutes = Router();

//router policies
accountRoutes.use(authPolicy([AuthenticatedOnly]));

// routes
accountRoutes.get(
  "/user-detail",
  useController(AccountController, "getUserDetails"),
);
accountRoutes.patch(
  "/user-detail",
  MulterSingleFile("avatar"),
  useController(AccountController, "updateUserDetails"),
);
accountRoutes.patch(
  "/update-password",
  useController(AccountController, "updateUserPassword"),
);
accountRoutes.patch(
  "/update-email",
  useController(AccountController, "updateUserEmail"),
);

export { accountRoutes };
