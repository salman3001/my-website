import { MediaCategoryController } from "controllers/media-catgegory.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const mediaCategoryRoutes = Router();

mediaCategoryRoutes.get("/", useController(MediaCategoryController, "findAll"));
mediaCategoryRoutes.get(
  "/:id",
  useController(MediaCategoryController, "findOne"),
);
mediaCategoryRoutes.post("/", useController(MediaCategoryController, "create"));
mediaCategoryRoutes.patch(
  "/:id",
  useController(MediaCategoryController, "update"),
);
mediaCategoryRoutes.delete(
  "/:id",
  useController(MediaCategoryController, "remove"),
);

export { mediaCategoryRoutes };
