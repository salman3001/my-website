import { CreateSeoSchema } from "../seo/create-seo.dto.js";
import { z } from "zod";

export const CreateBlogSchema = z.object({
  title: z.string().min(10),
  shortDesc: z.string().min(2),
  longDesc: z.string().optional(),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
  blogCategoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  mediaId: z.coerce.number().optional(),
  seo: CreateSeoSchema,
});

export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;
