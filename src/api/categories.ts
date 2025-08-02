import z from "zod";
import {
  CategoryResponse,
  CategoryResponseSchema,
} from "../types/response/CategoryResponse";
import { api } from "src/lib/axios";
import { BaseResponseSchema } from "src/types/response/BaseResponse";

const CategoryData = BaseResponseSchema(z.array(CategoryResponseSchema));

export const GetAllCategories = async (): Promise<CategoryResponse[]> => {
  const response = await api.get("/categories");

  const parsed = CategoryData.safeParse(response.data);
  if (!parsed.success) {
    console.error("Failed to parse categories:", parsed.error);
    throw new Error("Failed to fetch categories");
  }

  return parsed.data.data;
};
