import { PaintingSize } from "src/constant/paintings-size";
import { z } from "zod";

export const FormAddPaintingsSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string(),
  active: z.boolean(),
  imageUrl: z.union([z.instanceof(File), z.string()]),
  size: z.nativeEnum(PaintingSize, {
    error: () => ({ message: "Kích thước không hợp lệ" }),
  }),
  price: z.number().positive("Giá phải lớn hơn 0"),
  quantity: z.number().int().nonnegative("Số lượng không hợp lệ"),
  categoryIds: z.array(z.string()).min(1, "Phải chọn ít nhất 1 danh mục"),
});

export type FormAddPaintings = z.infer<typeof FormAddPaintingsSchema>;
