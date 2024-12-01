import { BlogCommentsController } from "controllers/blog-comment.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";
import { AuthenticatedOnly } from "policies/AuthenticatedOnly.js";

const blogCommentRoutes = Router();

//router policies
// -> add policies here

blogCommentRoutes.get("/", useController(BlogCommentsController, "findAll"));
blogCommentRoutes.get("/:id", useController(BlogCommentsController, "findOne"));

blogCommentRoutes.post(
  "/",
  authPolicy([AuthenticatedOnly]),
  useController(BlogCommentsController, "create"),
);

blogCommentRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(BlogCommentsController, "update"),
);
blogCommentRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(BlogCommentsController, "remove"),
);

export { blogCommentRoutes };
