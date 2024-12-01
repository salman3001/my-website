import { ContactMessageController } from "controllers/contact-message.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";

const contactMessageRoutes = Router();

contactMessageRoutes.get(
  "/",
  authPolicy([AdminsOnly]),
  useController(ContactMessageController, "findAll"),
);

contactMessageRoutes.get(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(ContactMessageController, "findOne"),
);
contactMessageRoutes.post(
  "/",
  useController(ContactMessageController, "create"),
);

contactMessageRoutes.delete(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(ContactMessageController, "remove"),
);

export { contactMessageRoutes };
