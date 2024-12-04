import { EmailSubscriptionController } from "controllers/email-subscription.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";

const emailSubscriptionRoutes = Router();

emailSubscriptionRoutes.get(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(EmailSubscriptionController, "findAll"),
);

emailSubscriptionRoutes.get(
  "/:id",
  authPolicy([AdminsOnlyPolicy]),
  useController(EmailSubscriptionController, "findOne"),
);

emailSubscriptionRoutes.post(
  "/",
  authPolicy([AdminsOnlyPolicy]),
  useController(EmailSubscriptionController, "create"),
);

emailSubscriptionRoutes.patch(
  "/:email",
  authPolicy([AdminsOnlyPolicy]),
  useController(EmailSubscriptionController, "update"),
);

emailSubscriptionRoutes.delete(
  "/:email",
  authPolicy([AdminsOnlyPolicy]),
  useController(EmailSubscriptionController, "remove"),
);

export { emailSubscriptionRoutes };
