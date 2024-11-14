import { DiscussionCommentsController } from "controllers/discussion-comments.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const discussionCommentRoutes = Router();

discussionCommentRoutes.get(
  "/",
  useController(DiscussionCommentsController, "findAll"),
);
discussionCommentRoutes.get(
  "/:id",
  useController(DiscussionCommentsController, "findOne"),
);
discussionCommentRoutes.post(
  "/",
  useController(DiscussionCommentsController, "create"),
);
discussionCommentRoutes.patch(
  "/:id",
  useController(DiscussionCommentsController, "update"),
);
discussionCommentRoutes.delete(
  "/:id",
  useController(DiscussionCommentsController, "remove"),
);

export { discussionCommentRoutes };
