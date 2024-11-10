import { z } from "zod";

export const CreateBlogCategorySchema = z.object({
  name: z.string().min(2),
  desc: z.string().min(1).max(256).optional().or(z.literal("")),
  iconsMediaId: z.coerce.number().optional(),
});

export type CreateBlogCategoryDto = z.infer<typeof CreateBlogCategorySchema>;
