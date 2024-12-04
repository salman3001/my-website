import { MediaCategoryController } from "controllers/media-catgegory.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";

const mediaCategoryRoutes = Router();

mediaCategoryRoutes.get(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(MediaCategoryController, "findAll"),
);

mediaCategoryRoutes.get(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(MediaCategoryController, "findOne"),
);

mediaCategoryRoutes.post(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(MediaCategoryController, "create"),
);

mediaCategoryRoutes.patch(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(MediaCategoryController, "update"),
);

mediaCategoryRoutes.delete(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(MediaCategoryController, "remove"),
);

export { mediaCategoryRoutes };
