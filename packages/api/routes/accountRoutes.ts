import { AccountController } from "controllers/account.controller.js";
import { Router, useController } from "my-website.common/express/index.js";
import { MulterSingleFile } from "my-website.common/express/middlewares/multer-single-file.middleware.js";

const accountRoutes = Router();

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
