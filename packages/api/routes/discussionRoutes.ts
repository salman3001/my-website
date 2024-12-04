import { DiscussionController } from "controllers/discussion.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";
import { AuthenticatedOnlyPolicy } from "policies/AuthenticatedOnlyPolicy.js";

const discussionRoutes = Router();

discussionRoutes.get("/", useController(DiscussionController, "findAll"));
discussionRoutes.get("/:id", useController(DiscussionController, "findOne"));
discussionRoutes.post(
  "/",
  authPolicy([AuthenticatedOnlyPolicy]),
  useController(DiscussionController, "create"),
);

discussionRoutes.patch(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(DiscussionController, "update"),
);
discussionRoutes.delete(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(DiscussionController, "remove"),
);

export { discussionRoutes };
