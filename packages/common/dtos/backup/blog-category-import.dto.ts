import { z } from "zod";

export const BlogCategoryImportSchema = z.object({
  name: z.string().min(2),
  id: z.string().min(2),
  desc: z.string().optional(),
  mediaId: z.coerce.number().optional(),
});
