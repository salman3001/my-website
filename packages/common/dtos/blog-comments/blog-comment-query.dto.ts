import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const BlogCommentQueryShema = z.intersection(
  CommonQueryDto,
  z.object({
    blogId: z.string().optional(),
    parentId: z.coerce.number().optional(),
  }),
);

export interface BlogCommentFindOneQuery {
  select: string[];
}

export const BlogCommentFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
