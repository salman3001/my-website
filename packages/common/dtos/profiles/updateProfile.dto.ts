import { z } from "zod";

export const UpdateProfileSchema = z.object({});
export type updateProfileDto = z.infer<typeof UpdateProfileSchema>;
