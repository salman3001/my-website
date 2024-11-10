import { z } from "zod";

export const BlogsImportSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(10),
  shortDesc: z.string().optional(),
  longDesc: z.string().optional(),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
  blogCategoryId: z.string().optional(),
  mediaId: z.coerce.number().optional(),
  userId: z.coerce.number().min(1),
});
