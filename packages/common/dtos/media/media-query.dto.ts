import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const MediaQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({
    mediaCategoryId: z.coerce.number().optional(),
  }),
);

export const MediaFindOneQueryShema = z.object({
  select: z.array(z.string()).optional(),
});
