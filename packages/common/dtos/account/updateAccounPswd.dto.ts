import { z } from "zod";

export const UpdateAccountPswdSchema = z
  .object({
    old_password: z.string(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .superRefine((args, ctx) => {
    if (args.password !== args.password_confirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match",
        path: ["password_confirmation"],
      });
    }
  });

export type updateAccountPswdDto = z.infer<typeof UpdateAccountPswdSchema>;
