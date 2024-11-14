import { BlogController } from "controllers/blog.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const blogRoutes = Router();

blogRoutes.get("/", useController(BlogController, "findAll"));
blogRoutes.get("/:id", useController(BlogController, "findOne"));
blogRoutes.post("/", useController(BlogController, "create"));
blogRoutes.patch("/:id", useController(BlogController, "update"));
blogRoutes.delete("/:id", useController(BlogController, "remove"));

export { blogRoutes };
