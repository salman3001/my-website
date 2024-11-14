import { UserController } from "controllers/user.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const userRoutes = Router();

userRoutes.get("/", useController(UserController, "findAll"));
userRoutes.get("/:id", useController(UserController, "findOne"));
userRoutes.get(
  "/:userName",
  useController(UserController, "findUserPublicProfile"),
);
userRoutes.post("/", useController(UserController, "create"));
userRoutes.patch("/:id", useController(UserController, "update"));
userRoutes.delete("/:id", useController(UserController, "remove"));

export { userRoutes };
