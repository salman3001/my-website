import { z } from "zod";

export const CreateMediaCategorySchema = z.object({
  name: z.string().min(2),
});

export type CreateMediaCategoryDto = z.infer<typeof CreateMediaCategorySchema>;
