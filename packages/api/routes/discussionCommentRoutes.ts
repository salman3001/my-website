import { DiscussionCommentsController } from "controllers/discussion-comments.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";
import { AuthenticatedOnlyPolicy } from "policies/AuthenticatedOnlyPolicy.js";

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
  authPolicy([AuthenticatedOnlyPolicy]),
  useController(DiscussionCommentsController, "create"),
);

discussionCommentRoutes.patch(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(DiscussionCommentsController, "update"),
);

discussionCommentRoutes.delete(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(DiscussionCommentsController, "remove"),
);

export { discussionCommentRoutes };
