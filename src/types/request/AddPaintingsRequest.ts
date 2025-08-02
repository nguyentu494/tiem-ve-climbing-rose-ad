import { PaintingSize } from "src/constant/paintings-size";
import { z } from "zod";

export const AddPaintingsSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string(),
  imageUrl: z.string().url("URL hình ảnh không hợp lệ"),
  size: z.enum(PaintingSize, "Kích thước không hợp lệ"),
  price: z.number().positive("Giá phải lớn hơn 0"),
  quantity: z.number().int().nonnegative("Số lượng không hợp lệ"),
  categoryIds: z.array(z.string()).min(1, "Phải chọn ít nhất 1 danh mục"),
});

export type AddPaintingsRequest = z.infer<typeof AddPaintingsSchema>;
