import { z } from "zod";

export const ContactMessageImportSchema = z.object({
  id: z.number().min(1),
  email: z.string().email().toLowerCase(),
  message: z.string().min(5),
  phone: z.string().optional(),
});
