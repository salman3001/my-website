import { MediaCategoryController } from "controllers/media-catgegory.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";

const mediaCategoryRoutes = Router();

mediaCategoryRoutes.get(
  "/",
  authPolicy([AdminsOnly]),
  useController(MediaCategoryController, "findAll"),
);

mediaCategoryRoutes.get(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(MediaCategoryController, "findOne"),
);

mediaCategoryRoutes.post(
  "/",
  authPolicy([AdminsOnly]),
  useController(MediaCategoryController, "create"),
);

mediaCategoryRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(MediaCategoryController, "update"),
);

mediaCategoryRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(MediaCategoryController, "remove"),
);

export { mediaCategoryRoutes };
