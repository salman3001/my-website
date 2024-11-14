import { TagController } from "controllers/tags.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const tagRoutes = Router();

tagRoutes.get("/", useController(TagController, "findAll"));
tagRoutes.get("/:id", useController(TagController, "findOne"));
tagRoutes.post("/", useController(TagController, "create"));
tagRoutes.patch("/:id", useController(TagController, "update"));
tagRoutes.delete("/:id", useController(TagController, "remove"));

export { tagRoutes };
