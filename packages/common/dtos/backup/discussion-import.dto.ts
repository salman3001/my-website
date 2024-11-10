import { z } from "zod";

export const DiscussionImportSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  desc: z.string(),
  isPublished: z.boolean(),
  views: z.coerce.number(),
  userId: z.coerce.number(),
});
