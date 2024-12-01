import { EmailSubscriptionController } from "controllers/email-subscription.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnly } from "policies/AdminsOnly.js";

const emailSubscriptionRoutes = Router();

emailSubscriptionRoutes.get(
  "/",
  authPolicy([AdminsOnly]),
  useController(EmailSubscriptionController, "findAll"),
);

emailSubscriptionRoutes.get(
  "/:id",
  authPolicy([AdminsOnly]),
  useController(EmailSubscriptionController, "findOne"),
);

emailSubscriptionRoutes.post(
  "/",
  authPolicy([AdminsOnly]),
  useController(EmailSubscriptionController, "create"),
);

emailSubscriptionRoutes.patch(
  "/:email",
  authPolicy([AdminsOnly]),
  useController(EmailSubscriptionController, "update"),
);

emailSubscriptionRoutes.delete(
  "/:email",
  authPolicy([AdminsOnly]),
  useController(EmailSubscriptionController, "remove"),
);

export { emailSubscriptionRoutes };
