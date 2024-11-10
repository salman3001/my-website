import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const BlogCategoryQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({
    blogId: z.coerce.number().optional(),
    parentId: z.coerce.number().optional(),
  }),
);

export const BlogCategoryFindOneShema = z.object({
  select: z.array(z.string()).optional(),
});
