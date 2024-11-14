import { ProjectController } from "controllers/project.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const projectRoutes = Router();

projectRoutes.get("/", useController(ProjectController, "findAll"));
projectRoutes.get("/:id", useController(ProjectController, "findOne"));
projectRoutes.post("/", useController(ProjectController, "create"));
projectRoutes.patch("/:id", useController(ProjectController, "update"));
projectRoutes.delete("/:id", useController(ProjectController, "remove"));

export { projectRoutes };
