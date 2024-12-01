import { DiscussionController } from "controllers/discussion.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";
import { AuthenticatedOnly } from "policies/AuthenticatedOnly.js";

const discussionRoutes = Router();

discussionRoutes.get("/", useController(DiscussionController, "findAll"));
discussionRoutes.get("/:id", useController(DiscussionController, "findOne"));
discussionRoutes.post(
  "/",
  authPolicy([AuthenticatedOnly]),
  useController(DiscussionController, "create"),
);

discussionRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(DiscussionController, "update"),
);
discussionRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(DiscussionController, "remove"),
);

export { discussionRoutes };
