import { CreateBlogSchema } from "./create-blog.dto.js";
import { z } from "zod";

export const UpdateBlogSchema = CreateBlogSchema.partial();
export type UpdateBlogDto = z.infer<typeof UpdateBlogSchema>;
