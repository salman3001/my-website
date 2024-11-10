import { z } from "zod";
import { CreateDiscussionSchema } from "./create-discussion.dto.js";

export const UpdateDiscussionSchema = CreateDiscussionSchema.partial();
export type UpdateDiscussionDto = z.infer<typeof UpdateDiscussionSchema>;
