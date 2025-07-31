import { z, ZodTypeAny } from "zod";

export const BaseResponseSchema = <T extends ZodTypeAny>(dataSchema: T) =>
  z.object({
    statusCode: z.number(),
    message: z.string(),
    data: dataSchema,
  });
