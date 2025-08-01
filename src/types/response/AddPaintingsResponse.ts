import { PaintingSize } from "src/enums/paintings-size.enum";
import { z } from "zod";
import { CategoryResponseSchema } from "./CategoryResponse";

export const AddPaintingsResponseSchema = z.object({
  paintingId: z.string(),
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string(),
  imageUrl: z.string().url("URL hình ảnh không hợp lệ"),
  size: z.enum(PaintingSize, "Kích thước không hợp lệ"),
  price: z.number().positive("Giá phải lớn hơn 0"),
  quantity: z.number().int().nonnegative("Số lượng không hợp lệ"),
  categories: z.array(CategoryResponseSchema).min(1, "Phải chọn ít nhất 1 danh mục"),
});

export type AddPaintingsResponse = z.infer<typeof AddPaintingsResponseSchema>;