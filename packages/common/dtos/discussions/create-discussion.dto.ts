import { z } from "zod";
import { CreateSeoSchema } from "../seo/create-seo.dto.js";

export const CreateDiscussionSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(2),
  tagIds: z.array(z.string()).optional(),
  seo: CreateSeoSchema,
});

export type CreateDiscussionDto = z.infer<typeof CreateDiscussionSchema>;
