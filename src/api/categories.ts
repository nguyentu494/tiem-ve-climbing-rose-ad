import z from "zod";
import {
  CategoryResponse,
  CategoryResponseSchema,
} from "../types/response/CategoryResponse";
import { api } from "src/lib/axios";
import { BaseResponseSchema } from "src/types/response/BaseResponse";
import { CategoryRequest } from "src/types/request/CategoryRequest";

const CategoryData = BaseResponseSchema(z.array(CategoryResponseSchema));
export type CategoryData = z.infer<typeof CategoryData>;

export const GetAllCategories = async (): Promise<CategoryData> => {
  const response = await api.get("/categories");

  const parsed = CategoryData.safeParse(response.data);
  if (!parsed.success) {
    console.error("Failed to parse categories:", parsed.error);
    throw new Error("Failed to fetch categories");
  }

  return parsed.data;
};


export const AddCategory = async (data: CategoryRequest): Promise<CategoryData> => {
  try {
    const formData = new FormData();
    formData.append("file", data.imageUrl);

    const responseImage = await api.post("/files/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // BẮT BUỘC
      },
    });

    const imageUrl = responseImage.data.data.secure_url;

    const response = await api.post("/categories/create", null, {
      params: {
        ...data,
        imageUrl,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};