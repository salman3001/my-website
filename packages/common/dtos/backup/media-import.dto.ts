import { z } from "zod";

export const MediaImportSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(2),
  type: z.enum(["Audio", "Video", "Image", "document"]).optional(),
  url: z.string().min(2),
  mediaCategoryId: z.coerce.number().optional(),
});
