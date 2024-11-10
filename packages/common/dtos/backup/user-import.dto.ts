import { z } from "zod";

export const userImportSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(10).optional().or(z.literal("")),
  userType: z.enum(["Admin", "User"]),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
});
