import { z } from "zod";

export const RegisterSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8),
  phone: z.string().min(10).optional().or(z.literal("")),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
