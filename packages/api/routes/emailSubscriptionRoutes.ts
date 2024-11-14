import { EmailSubscriptionController } from "controllers/email-subscription.controller.js";
import { Router, useController } from "my-website.common/express/index.js";

const emailSubscriptionRoutes = Router();

emailSubscriptionRoutes.get(
  "/",
  useController(EmailSubscriptionController, "findAll"),
);
emailSubscriptionRoutes.get(
  "/:id",
  useController(EmailSubscriptionController, "findOne"),
);
emailSubscriptionRoutes.post(
  "/",
  useController(EmailSubscriptionController, "create"),
);
emailSubscriptionRoutes.patch(
  "/:email",
  useController(EmailSubscriptionController, "update"),
);
emailSubscriptionRoutes.delete(
  "/:email",
  useController(EmailSubscriptionController, "remove"),
);

export { emailSubscriptionRoutes };
