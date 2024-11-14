import { ContactMessageController } from "controllers/contact-message.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const contactMessageRoutes = Router();

contactMessageRoutes.get(
  "/",
  useController(ContactMessageController, "findAll"),
);
contactMessageRoutes.get(
  "/:id",
  useController(ContactMessageController, "findOne"),
);
contactMessageRoutes.post(
  "/",
  useController(ContactMessageController, "create"),
);
contactMessageRoutes.delete(
  "/:id",
  useController(ContactMessageController, "remove"),
);

export { contactMessageRoutes };
