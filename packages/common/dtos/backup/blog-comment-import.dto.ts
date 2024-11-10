import { z } from "zod";

export const BlogCommentImportSchema = z.object({
  id: z.coerce.number(),
  message: z.string().min(2),
  isApproved: z.boolean(),
  blogId: z.string().min(1),
  parentId: z.coerce.number().optional(),
  userId: z.number().min(1),
});
