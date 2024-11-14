import { BlogCommentsController } from "controllers/blog-comment.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const blogCommentRoutes = Router();

blogCommentRoutes.get("/", useController(BlogCommentsController, "findAll"));
blogCommentRoutes.get("/:id", useController(BlogCommentsController, "findOne"));
blogCommentRoutes.post("/", useController(BlogCommentsController, "create"));
blogCommentRoutes.patch(
  "/:id",
  useController(BlogCommentsController, "update"),
);
blogCommentRoutes.delete(
  "/:id",
  useController(BlogCommentsController, "remove"),
);

export { blogCommentRoutes };
