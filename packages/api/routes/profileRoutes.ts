import { ProfileController } from "controllers/profile.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const profileRoutes = Router();

profileRoutes.patch(
  "/:userId",
  useController(ProfileController, "updateByUSerId"),
);

export { profileRoutes };
