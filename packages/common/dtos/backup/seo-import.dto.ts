import { z } from "zod";

export const SeoImportSchema = z.object({
  id: z.coerce.number(),
  title: z.string().optional(),
  keyword: z.string().optional(),
  desc: z.string().optional(),
  blogSlug: z.string().optional(),
  discussionSlug: z.string().optional(),
});
