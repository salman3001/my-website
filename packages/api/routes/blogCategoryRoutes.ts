import { BlogCategoryController } from "controllers/blog-catgegory.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";

const blogCategoryRoutes = Router();

//router policies

blogCategoryRoutes.get("/", useController(BlogCategoryController, "findAll"));

blogCategoryRoutes.get(
  "/:id",
  useController(BlogCategoryController, "findOne"),
);

blogCategoryRoutes.post(
  "/",
  authPolicy([AdminsOnly]),
  useController(BlogCategoryController, "create"),
);

blogCategoryRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(BlogCategoryController, "update"),
);

blogCategoryRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(BlogCategoryController, "remove"),
);

export { blogCategoryRoutes };
