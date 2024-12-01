import { z } from "zod";

export const GoogleLoginSchema = z.object({
  credential: z.string().min(1),
});

export type GoogleLoginDto = z.infer<typeof GoogleLoginSchema>;
