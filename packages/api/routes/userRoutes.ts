import { UserController } from "controllers/user.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";

const userRoutes = Router();

userRoutes.get(
  "/",
  authPolicy([AdminsOnly]),
  useController(UserController, "findAll"),
);

userRoutes.get(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(UserController, "findOne"),
);

userRoutes.get(
  "/public-profile/:userName",
  authPolicy([AdminsOnly]),
  useController(UserController, "findUserPublicProfile"),
);

userRoutes.post(
  "/",
  authPolicy([AdminsOnly]),
  useController(UserController, "create"),
);

userRoutes.patch(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(UserController, "update"),
);

userRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(UserController, "remove"),
);

export { userRoutes };
