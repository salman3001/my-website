import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const MediaCategoryQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({}),
);

export const MediaCategoryFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
