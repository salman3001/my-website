import { z } from "zod";
import { createUserDtoSchema } from "./create-user.dto.js";

export const updateUserDtoSchema = createUserDtoSchema.partial();

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
