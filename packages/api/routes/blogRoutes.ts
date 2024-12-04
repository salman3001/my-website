import { BlogController } from "controllers/blog.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";

const blogRoutes = Router();

blogRoutes.get("/", useController(BlogController, "findAll"));
blogRoutes.get("/:id", useController(BlogController, "findOne"));

blogRoutes.post(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(BlogController, "create"),
);

blogRoutes.patch(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(BlogController, "update"),
);

blogRoutes.delete(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(BlogController, "remove"),
);

export { blogRoutes };
