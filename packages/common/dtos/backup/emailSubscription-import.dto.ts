import { z } from "zod";

export const EmailSubscriptionImportSchema = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  userId: z.coerce.number().optional(),
});
