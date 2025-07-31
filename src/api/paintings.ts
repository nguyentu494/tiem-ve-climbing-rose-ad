import { FormAddPaintings, FormAddPaintingsSchema } from './../types/ui/FormAddPaintings';
import { api } from "src/lib/axios";
import { AddPaintingsRequest, AddPaintingsSchema } from "src/types/request/AddPaintingsRequest";
import { BaseResponseSchema } from "src/types/response/BaseResponse";
import { AddPaintingsResponseSchema } from 'src/types/response/PaintingsRespose';
import z from "zod";

const AddPaintingsResponse = BaseResponseSchema(AddPaintingsResponseSchema)

type AddPaintingsType = z.infer<typeof AddPaintingsResponse>;

export const AddPaintings = async (data: FormAddPaintings): Promise<AddPaintingsType> => {
    try{
        const formData = new FormData();
        formData.append("file", data.imageUrl); 

        console.log("Uploading image:", data.imageUrl);

        console.log("Form data:", formData.get("file"));

        const responseImage = await api.post("/files/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // BẮT BUỘC
          },
        });

        const imageUrl = responseImage.data.data.url;

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

export const GetAllPaintings = async (params?: Record<string, any>) => {
  try {
    const response = await api.get("/paintings", {
      params
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paintings:", error);
    throw error;
  }
};
