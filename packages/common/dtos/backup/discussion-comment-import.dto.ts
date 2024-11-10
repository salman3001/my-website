import { z } from "zod";

export const DiscuusionCommentImportSchema = z.object({
  id: z.coerce.number(),
  message: z.string(),
  isApproved: z.boolean(),
  discussionId: z.string().min(1),
  parentId: z.coerce.number().optional(),
  userId: z.coerce.number().min(1),
});
