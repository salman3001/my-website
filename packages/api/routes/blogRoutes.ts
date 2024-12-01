import { BlogController } from "controllers/blog.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";

const blogRoutes = Router();

blogRoutes.get("/", useController(BlogController, "findAll"));
blogRoutes.get("/:id", useController(BlogController, "findOne"));

blogRoutes.post(
  "/",
  authPolicy([AdminsOnly]),
  useController(BlogController, "create"),
);

blogRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(BlogController, "update"),
);

blogRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(BlogController, "remove"),
);

export { blogRoutes };
