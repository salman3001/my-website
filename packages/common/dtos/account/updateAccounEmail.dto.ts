import { z } from "zod";

export const UpdateAccountEmailSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string(),
});

export type UpdateAccountEmailDto = z.infer<typeof UpdateAccountEmailSchema>;
