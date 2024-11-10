import { z } from "zod";

export const MediaCategoryImportSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1),
});
