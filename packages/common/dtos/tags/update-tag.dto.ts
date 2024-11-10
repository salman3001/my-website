import { CreateTagSchema } from "./create-tag.dto.js";
import { z } from "zod";

export const UpdateTagSchema = CreateTagSchema.partial();
export type UpdateTagDto = z.infer<typeof UpdateTagSchema>;
