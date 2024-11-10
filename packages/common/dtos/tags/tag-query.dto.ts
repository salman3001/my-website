import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const TagQuerySchema = z.intersection(CommonQueryDto, z.object({}));

export const TagFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
