import { api } from "src/lib/axios";
import { SearchingParams } from "src/types/request/PaintingParams";
import { AddPaintingsResponseSchema } from "src/types/response/AddPaintingsResponse";
import { BaseResponseSchema } from "src/types/response/BaseResponse";
import { PaintingsResponse } from "src/types/response/PaintingsResponse";
import z, { string } from "zod";
import { FormAddPaintings } from "./../types/ui/FormAddPaintings";

const AddPaintingsResponse = BaseResponseSchema(AddPaintingsResponseSchema);

type AddPaintingsType = z.infer<typeof AddPaintingsResponse>;

export const AddPaintings = async (
  data: FormAddPaintings
): Promise<AddPaintingsType> => {
  try {
    const formData = new FormData();
    formData.append("file", data.imageUrl);

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

export const updatePaintings = async (
  data: FormAddPaintings,
  paintingId: string
) => {
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

    const response = await api.put(
      "/paintings",
      {
        ...data,
        imageUrl,
      },
      {
        params: {
          paintingId,
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error adding painting:", error);
    throw error;
  }
};

export const GetAllPaintings = async (
  params?: SearchingParams
): Promise<PaintingsResponse> => {
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
