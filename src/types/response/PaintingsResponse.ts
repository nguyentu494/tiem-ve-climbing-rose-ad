import z, { size } from "zod";
import { AddPaintingsResponseSchema } from "./AddPaintingsResponse";

export const PaintingsResponseSchema = z.object({
  items: z.array(AddPaintingsResponseSchema),
  page: z.number().int().nonnegative(),
  size: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  totalItems: z.number().int().nonnegative(),
});

export type PaintingsResponse = z.infer<typeof PaintingsResponseSchema>;