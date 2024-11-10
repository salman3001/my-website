import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const UserQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({
    blogCategoryId: z.string().optional(),
    tagId: z.string().optional(),
    isFeatured: z.boolean().optional(),
    isPublished: z.boolean().optional(),
  }),
);

export const UserFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
