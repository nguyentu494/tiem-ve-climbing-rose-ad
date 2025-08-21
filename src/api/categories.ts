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

export const getCategoryById = async (
  categoryId: string
): Promise<CategoryResponse> => {
  const response = await api.get(`/categories/${categoryId}`);

  const parsed = CategoryResponseSchema.safeParse(response.data.data);
  if (!parsed.success) {
    console.error("Failed to parse category:", parsed.error);
    throw new Error("Failed to fetch category");
  }

  return parsed.data;
};

export const DeleteCategory = async (categoryId: string): Promise<void> => {
  try {
    const result = await api.delete(`/categories/delete/${categoryId}`);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const AddCategory = async (
  data: CategoryRequest
): Promise<CategoryData> => {
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

export const UpdateCategory = async (
  categoryId: string,
  data: CategoryRequest
): Promise<CategoryData> => {
  try {
    const formData = new FormData();
    formData.append("file", data.imageUrl);

    let imageUrl: string;
    if (!data.imageUrl || typeof data.imageUrl !== "string") {
      const responseImage = await api.post("/files/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // BẮT BUỘC
        },
      });
      imageUrl = responseImage.data.data.secure_url;
    } else {
      imageUrl = data.imageUrl;
    }

    const response = await api.put("/categories", 
      {
        ...data,
        imageUrl,
      },
      {
        params: {
          categoryId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};
