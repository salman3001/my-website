import { z } from "zod";

export const CreateDiscussionCommentSchema = z.object({
  message: z.string().min(1),
  discussionId: z.string(),
  parentId: z.coerce.number().optional(),
});

export type CreateDiscussionCommentDto = z.infer<
  typeof CreateDiscussionCommentSchema
>;
