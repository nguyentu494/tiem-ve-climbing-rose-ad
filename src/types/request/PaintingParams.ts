import { z } from "zod";

export const SearchingParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  size: z.number().int().positive().optional(),
  search: z.string().optional(),
  sizes: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  categoryIds: z.array(z.string()).optional(),
  keyword: z.string().optional(),
  sort: z.string().optional(),
});

// TypeScript type (nếu cần dùng lại type inference từ schema)
export type SearchingParams = z.infer<typeof SearchingParamsSchema>;
