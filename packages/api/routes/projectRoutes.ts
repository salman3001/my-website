import { ProjectController } from "controllers/project.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";

const projectRoutes = Router();

projectRoutes.get("/", useController(ProjectController, "findAll"));
projectRoutes.get("/:id", useController(ProjectController, "findOne"));
projectRoutes.post(
  "/",
  authPolicy([AdminsOnly]),
  useController(ProjectController, "create"),
);

projectRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(ProjectController, "update"),
);

projectRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(ProjectController, "remove"),
);

export { projectRoutes };
