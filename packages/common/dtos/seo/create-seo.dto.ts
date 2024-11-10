import { z } from "zod";

export const CreateSeoSchema = z.object({
  title: z.string().optional(),
  keyword: z.string().optional(),
  desc: z.string().optional(),
});

export type CreateSeoDto = z.infer<typeof CreateSeoSchema>;
