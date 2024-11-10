import { CreateMediaCategorySchema } from "./create-media-category.dto.js";
import { z } from "zod";

export const UpdateMediaCategorySchema = CreateMediaCategorySchema.partial();

export type UpdateMediaCategoryDto = z.infer<typeof UpdateMediaCategorySchema>;
