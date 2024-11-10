import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const DiscussionQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({
    discussionId: z.string().optional(),
    parentId: z.coerce.number().optional(),
  }),
);

export const DiscussionFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
