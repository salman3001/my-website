import { MediaController } from "controllers/media.controller.js";
import { Router, useController } from "my-website.common/express/index.js";
import { MulterSingleFile } from "my-website.common/express/middlewares/multer-single-file.middleware.js";

const mediaRoutes = Router();

mediaRoutes.get("/", useController(MediaController, "findAll"));
mediaRoutes.get("/:id", useController(MediaController, "findOne"));
mediaRoutes.post(
  "/",
  MulterSingleFile("file"),
  useController(MediaController, "create"),
);
mediaRoutes.patch(
  "/:id",
  MulterSingleFile("file"),
  useController(MediaController, "update"),
);
mediaRoutes.delete("/:id", useController(MediaController, "remove"));

export { mediaRoutes };
