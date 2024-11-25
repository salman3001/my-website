import { z } from "zod";

export const ResendVerificationEmailSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
});

export type ResendVerificationEmailDto = z.infer<
  typeof ResendVerificationEmailSchema
>;
