import * as z from "zod";

export const formAddSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Please enter a valid URL"),
  size: z.string().min(1, "Size is required"),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().int().min(0, "Quantity must be a positive integer"),
  categoryIds: z.array(z.string()).min(1, "At least one category is required"),
});

export type FormAddData = z.infer<typeof formAddSchema>;
