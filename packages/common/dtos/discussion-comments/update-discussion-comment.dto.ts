import { z } from "zod";
import { CreateDiscussionCommentSchema } from "./create-discussion-comment.dto.js";

export const UpdateDiscussionCommentSchema =
  CreateDiscussionCommentSchema.partial();

export type UpdateDiscussionCommentDto = z.infer<
  typeof UpdateDiscussionCommentSchema
>;
