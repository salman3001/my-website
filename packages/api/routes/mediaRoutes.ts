import { MediaController } from "controllers/media.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { MulterSingleFile } from "my-website.common/express/middlewares/multer-single-file.middleware.js";
import { AdminsOnly } from "policies/AdminsOnly.js";

const mediaRoutes = Router();

mediaRoutes.get(
  "/",
  authPolicy([AdminsOnly]),
  useController(MediaController, "findAll"),
);

mediaRoutes.get(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(MediaController, "findOne"),
);

mediaRoutes.post(
  "/",
  authPolicy([AdminsOnly]),
  MulterSingleFile("file"),
  useController(MediaController, "create"),
);
mediaRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  MulterSingleFile("file"),
  useController(MediaController, "update"),
);
mediaRoutes.delete("/:id", useController(MediaController, "remove"));

export { mediaRoutes };
