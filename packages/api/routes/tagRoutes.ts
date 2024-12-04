import { TagController } from "controllers/tags.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";

const tagRoutes = Router();

tagRoutes.get("/", useController(TagController, "findAll"));
tagRoutes.get("/:id", useController(TagController, "findOne"));
tagRoutes.post(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(TagController, "create"),
);
tagRoutes.patch(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(TagController, "update"),
);
tagRoutes.delete(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(TagController, "remove"),
);

export { tagRoutes };
