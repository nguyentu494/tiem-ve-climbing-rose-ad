import * as z from "zod";

export const formAddSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên tranh"),
  description: z.string().min(1, "Vui lòng nhập mô tả tranh"),
  imageUrl: z.string().url("Vui lòng nhập URL hợp lệ"),
  size: z.string().min(1, "Vui lòng nhập kích thước tranh"),
  price: z.number().min(0, "Giá phải là số dương"),
  quantity: z.number().int().min(0, "Số lượng phải là số nguyên dương"),
  categoryIds: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một danh mục"),
});

export type FormAddData = z.infer<typeof formAddSchema>;
