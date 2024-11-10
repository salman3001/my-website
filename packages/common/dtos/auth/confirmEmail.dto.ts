import { z } from "zod";

export const ConfirmEmailSchema = z.object({
  jwt: z.string().min(1),
});

export type ConfirmEmailDto = z.infer<typeof ConfirmEmailSchema>;
