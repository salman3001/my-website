import { z } from "zod";
import { CreateMediaSchema } from "./create-media.dto.js";

export const UpdateMediaSchema = CreateMediaSchema.partial();
export type UpdateMediaDto = z.infer<typeof UpdateMediaSchema>;
