import { DiscussionController } from "controllers/discussion.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const discussionRoutes = Router();

discussionRoutes.get("/", useController(DiscussionController, "findAll"));
discussionRoutes.get("/:id", useController(DiscussionController, "findOne"));
discussionRoutes.post("/", useController(DiscussionController, "create"));
discussionRoutes.patch("/:id", useController(DiscussionController, "update"));
discussionRoutes.delete("/:id", useController(DiscussionController, "remove"));

export { discussionRoutes };
