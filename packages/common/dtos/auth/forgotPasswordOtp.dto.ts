import { z } from "zod";

export const ForgotPasswordOtpSchema = z.object({
  email: z.string().min(1).email().trim().toLowerCase(),
});

export type ForgotPasswordOtpDto = z.infer<typeof ForgotPasswordOtpSchema>;
