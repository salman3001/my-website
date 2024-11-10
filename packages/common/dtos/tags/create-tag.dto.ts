import { z } from "zod";

export const CreateTagSchema = z.object({
  name: z.string().min(2),
  desc: z.string().optional(),
  iconsMediaId: z.coerce.number().optional(),
});

export type CreateTagDto = z.infer<typeof CreateTagSchema>;
