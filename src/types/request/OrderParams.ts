import { z } from "zod";

export const OrderParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  size: z.number().int().positive().optional(),
  sort: z.string().optional(),
});

// TypeScript type (nếu cần dùng lại type inference từ schema)
export type OrderParams = z.infer<typeof OrderParamsSchema>;
