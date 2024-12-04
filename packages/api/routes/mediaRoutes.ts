import { MediaController } from "controllers/media.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { MulterSingleFile } from "my-website.common/express/middlewares/multer-single-file.middleware.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";

const mediaRoutes = Router();

mediaRoutes.get(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(MediaController, "findAll"),
);

mediaRoutes.get(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(MediaController, "findOne"),
);

mediaRoutes.post(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  MulterSingleFile("file"),
  useController(MediaController, "create"),
);
mediaRoutes.patch(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  MulterSingleFile("file"),
  useController(MediaController, "update"),
);
mediaRoutes.delete("/:id", useController(MediaController, "remove"));

export { mediaRoutes };
