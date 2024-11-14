import { BlogCategoryController } from "controllers/blog-catgegory.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const blogCategoryRoutes = Router();

blogCategoryRoutes.get("/", useController(BlogCategoryController, "findAll"));
blogCategoryRoutes.get(
  "/:id",
  useController(BlogCategoryController, "findOne"),
);
blogCategoryRoutes.post("/", useController(BlogCategoryController, "create"));
blogCategoryRoutes.patch(
  "/:id",
  useController(BlogCategoryController, "update"),
);
blogCategoryRoutes.delete(
  "/:id",
  useController(BlogCategoryController, "remove"),
);

export { blogCategoryRoutes };
