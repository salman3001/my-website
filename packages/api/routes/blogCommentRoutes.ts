import { BlogCommentsController } from "controllers/blog-comment.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";
import { AuthenticatedOnlyPolicy } from "policies/AuthenticatedOnlyPolicy.js";

const blogCommentRoutes = Router();

//router policies
// -> add policies here

blogCommentRoutes.get("/", useController(BlogCommentsController, "findAll"));
blogCommentRoutes.get("/:id", useController(BlogCommentsController, "findOne"));

blogCommentRoutes.post(
  "/",
  authPolicy([AuthenticatedOnlyPolicy]),
  useController(BlogCommentsController, "create"),
);

blogCommentRoutes.patch(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(BlogCommentsController, "update"),
);
blogCommentRoutes.delete(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(BlogCommentsController, "remove"),
);

export { blogCommentRoutes };
