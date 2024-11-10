import { z } from "zod";

export const ProjectImportSchema = z.object({
  id: z.coerce.number(),
  title: z.string().min(1),
  shortDesc: z.string().optional(),
  desc: z.string().optional(),
  isPublished: z.boolean(),
  thumbnailId: z.coerce.number().optional(),
  video: z.string().optional(),
});
