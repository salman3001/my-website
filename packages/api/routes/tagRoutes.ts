import { TagController } from "controllers/tags.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";

const tagRoutes = Router();

tagRoutes.get("/", useController(TagController, "findAll"));
tagRoutes.get("/:id", useController(TagController, "findOne"));
tagRoutes.post(
  "/",
  authPolicy([AdminsOnly]),
  useController(TagController, "create"),
);
tagRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(TagController, "update"),
);
tagRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(TagController, "remove"),
);

export { tagRoutes };
