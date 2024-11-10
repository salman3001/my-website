import { z } from "zod";
import { CreateContactMessageSchema } from "./create-contact-message.dto.js";

export const UpdateContactMessageSchema = CreateContactMessageSchema.partial();
export type UpdateContactMessageDto = z.infer<
  typeof UpdateContactMessageSchema
>;
