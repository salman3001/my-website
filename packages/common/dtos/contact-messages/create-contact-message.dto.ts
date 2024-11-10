import { z } from "zod";

export const CreateContactMessageSchema = z.object({
  email: z.string().email().toLowerCase(),
  message: z.string().min(5),
  phone: z.string().min(10).optional().or(z.literal("")),
});

export type CreateContactMessageDto = z.infer<
  typeof CreateContactMessageSchema
>;
