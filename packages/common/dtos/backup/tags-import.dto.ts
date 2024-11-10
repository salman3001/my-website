import { z } from "zod";

export const TagsImportSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  desc: z.string().optional(),
  iconsMediaId: z.coerce.number().optional(),
});
