import { ContactMessageController } from "controllers/contact-message.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";

const contactMessageRoutes = Router();

contactMessageRoutes.get(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(ContactMessageController, "findAll"),
);

contactMessageRoutes.get(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(ContactMessageController, "findOne"),
);
contactMessageRoutes.post(
  "/",
  useController(ContactMessageController, "create"),
);

contactMessageRoutes.delete(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(ContactMessageController, "remove"),
);

export { contactMessageRoutes };
