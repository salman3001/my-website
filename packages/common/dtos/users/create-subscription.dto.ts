import { z } from "zod";

export const UpdateSubscriptionSchema = z.object({
  blogCategoryIds: z.array(z.string()),
  tagIds: z.array(z.string()),
});

export type UpdateSubscriptionDto = z.infer<typeof UpdateSubscriptionSchema>;
