import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const ProjectQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({
    tagId: z.string().optional(),
  }),
);

export const ProjectFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
