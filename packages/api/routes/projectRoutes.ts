import { ProjectController } from "controllers/project.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";

const projectRoutes = Router();

projectRoutes.get("/", useController(ProjectController, "findAll"));
projectRoutes.get("/:id", useController(ProjectController, "findOne"));
projectRoutes.post(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(ProjectController, "create"),
);

projectRoutes.patch(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(ProjectController, "update"),
);

projectRoutes.delete(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(ProjectController, "remove"),
);

export { projectRoutes };
