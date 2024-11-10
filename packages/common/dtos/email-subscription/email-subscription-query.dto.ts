import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const EmailSubscriptionQuerySchema = z.intersection(
  CommonQueryDto,
  z.object({}),
);

export const EmailSubscriptionFindOneQuerySchema = z.object({
  select: z.array(z.string()).optional(),
});
