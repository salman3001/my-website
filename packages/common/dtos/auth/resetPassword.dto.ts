import { z } from "zod";

export const ResetPasswordSchema = z.object({
  password: z.string().min(8),
  jwt: z.string().min(1),
});

export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
