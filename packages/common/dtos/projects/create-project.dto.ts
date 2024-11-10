import { z } from "zod";

export const CreateProjectSchema = z.object({
  title: z.string().min(2),
  shortDesc: z.string().min(2),
  desc: z.string().optional(),
  isPublished: z.coerce.boolean(),
  thumbnailId: z.coerce.number().optional(),
  imagesIds: z.array(z.number()).optional(),
  video: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
