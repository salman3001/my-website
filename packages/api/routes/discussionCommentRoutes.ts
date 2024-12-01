import { DiscussionCommentsController } from "controllers/discussion-comments.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";
import { AuthenticatedOnly } from "policies/AuthenticatedOnly.js";

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
  authPolicy([AuthenticatedOnly]),
  useController(DiscussionCommentsController, "create"),
);

discussionCommentRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(DiscussionCommentsController, "update"),
);

discussionCommentRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(DiscussionCommentsController, "remove"),
);

export { discussionCommentRoutes };
