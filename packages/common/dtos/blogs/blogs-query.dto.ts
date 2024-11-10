import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const BlogsQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({
    blogCategoryId: z.string().optional(),
    tagId: z.string().optional(),
    isFeatured: z
      .string()
      .transform((v) => (v === "true" ? true : false))
      .optional(),
    isPublished: z
      .string()
      .transform((v) => (v === "true" ? true : false))
      .optional(),
  }),
);

export const BlogsFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
