import { z } from "zod";

export const CreateBlogCommentSchema = z.object({
  message: z.string().min(1),
  blogId: z.string().min(1, "blogId is required"),
  parentId: z.coerce.number().optional(),
});

export type CreateBlogCommentDto = z.infer<typeof CreateBlogCommentSchema>;
