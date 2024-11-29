import { z } from "zod";

export const UpdateAccountSchema = z.object({
  user: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(10).optional().or(z.literal("")),
  }),
});
export type updateAccountDto = z.infer<typeof UpdateAccountSchema>;
