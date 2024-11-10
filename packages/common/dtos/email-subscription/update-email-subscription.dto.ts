import { CreateEmailSubscriptionSchema } from "./create-email-subscription.dto.js";
import { z } from "zod";

export const UpdateEmailSubscriptionSchema =
  CreateEmailSubscriptionSchema.partial();
export type UpdateEmailSubscriptionDto = z.infer<
  typeof UpdateEmailSubscriptionSchema
>;
