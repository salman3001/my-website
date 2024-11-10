import { z } from "zod";

export const createUserDtoSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(10).optional().or(z.literal("")),
  userType: z.enum(["Admin", "User"]),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
