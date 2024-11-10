import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1).email().trim().toLowerCase(),
  password: z.string().min(8),
});

export type LoginDto = z.infer<typeof LoginSchema>;
