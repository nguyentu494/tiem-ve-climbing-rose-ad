import { api } from "src/lib/axios";
import { SearchingParams } from "src/types/request/SearchParams";
import { AddPaintingsResponseSchema } from "src/types/response/AddPaintingsResponse";
import { BaseResponseSchema } from "src/types/response/BaseResponse";
import { PaintingsResponse } from "src/types/response/PaintingsResponse";
import z from "zod";
import {
  FormAddPaintings
} from "./../types/ui/FormAddPaintings";

const AddPaintingsResponse = BaseResponseSchema(AddPaintingsResponseSchema);

type AddPaintingsType = z.infer<typeof AddPaintingsResponse>;

export const AddPaintings = async (
  data: FormAddPaintings
): Promise<AddPaintingsType> => {
  try {
    const formData = new FormData();
    formData.append("file", data.imageUrl);
    console.log(data, "FormData");

    const responseImage = await api.post("/files/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // BẮT BUỘC
      },
    });


    const imageUrl = responseImage.data.data.secure_url;

    const response = await api.post("/paintings/create", {
      ...data,
      imageUrl,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding painting:", error);
    throw error;
  }
};

export const GetAllPaintings = async (params?: SearchingParams): Promise<PaintingsResponse> => {
  try {
    const response = await api.get("/paintings", {
      params,
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        for (const key in params) {
          const value = params[key];
          if (Array.isArray(value)) {
            value.forEach((val) => searchParams.append(key, String(val)));
          } else {
            searchParams.append(key, String(value));
          }
        }
        return searchParams.toString();
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching paintings:", error);
    throw error;
  }
};
