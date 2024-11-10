import { z } from "zod";

export const CreateMediaSchema = z.object({
  name: z.string().min(2),
  type: z.enum(["Audio", "Video", "Image", "document"]),
  mediaCategoryId: z.coerce.number().optional(),
});

export type CreateMediaDto = z.infer<typeof CreateMediaSchema>;
