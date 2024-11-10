import { z } from "zod";

export const CreateEmailSubscriptionSchema = z.object({
  email: z.string().email().toLowerCase(),
  blogCategoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

export type CreateEmailSubscriptionDto = z.infer<
  typeof CreateEmailSubscriptionSchema
>;
