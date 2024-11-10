import { CreateSeoSchema } from "./create-seo.dto.js";
import { z } from "zod";

export const UpdateSeoSchema = CreateSeoSchema.partial();
export type UpdateSeoDto = z.infer<typeof UpdateSeoSchema>;
