import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const DiscussionQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({
    tagId: z.string().optional(),
    isPublished: z
      .string()
      .transform((v) => (v === "true" ? true : false))
      .optional(),
  }),
);

export const DiscussionFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
