import { z } from "zod";

export const CommonQueryDto = z.object({
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
  orderBy: z.string().optional(),
  select: z.array(z.string()).optional(),
  search: z.string().optional(),
});
