import z from "zod";

export const CategorySchhema = z.object({
  categoryCode: z.string().min(1, "Mã danh mục là bắt buộc"),
  name: z.string().min(1, "Tên danh mục là bắt buộc"),
  description: z.string().optional(),
  imageUrl: z.union([z.string().url(), z.instanceof(File)]),
  active: z.boolean(),
});

export type CategoryRequest = z.infer<typeof CategorySchhema>;
