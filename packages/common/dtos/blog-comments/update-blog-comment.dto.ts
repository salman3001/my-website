import { z } from "zod";
import { CreateBlogCommentSchema } from "./create-blog-comment.dto.js";

export const UpdateBlogCommentSchema = CreateBlogCommentSchema.partial();

export type UpdateBlogCommentDto = z.infer<typeof UpdateBlogCommentSchema>;
