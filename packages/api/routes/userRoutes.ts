import { UserController } from "controllers/user.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";

const userRoutes = Router();

userRoutes.get(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(UserController, "findAll"),
);

userRoutes.get(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(UserController, "findOne"),
);

userRoutes.get(
  "/public-profile/:userName",
  authPolicy([AdminsOnlyPolicy]),
  useController(UserController, "findUserPublicProfile"),
);

userRoutes.post(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(UserController, "create"),
);

userRoutes.patch(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(UserController, "update"),
);

userRoutes.delete(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(UserController, "remove"),
);

export { userRoutes };
