import { CommonQueryDto } from "../common-query.dto.js";
import { z } from "zod";

export const ContactMessageQueryShema = z.intersection(
  CommonQueryDto,
  z.object({}),
);
