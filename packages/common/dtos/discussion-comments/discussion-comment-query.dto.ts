import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const DiscussionCommentQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({
    discussionId: z.string().optional(),
    parentId: z.coerce.number().optional(),
    withProfile:z.string().optional()
  }),
);

export const DiscussionCommentFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
