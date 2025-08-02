import { api } from "src/lib/axios";
import { BaseResponseSchema } from "src/types/response/BaseResponse";
import { OrderSchema } from "src/types/response/OrderResponse";
import z from "zod";

const OrdersResponse = BaseResponseSchema(z.array(OrderSchema));

type OrdersResponseType = z.infer<typeof OrdersResponse>;

export const GetAllOrders = async (): Promise<OrdersResponseType> => {
    try {
        const response = await api.get("/orders/my-orders");
        const parsed = OrdersResponse.safeParse(response.data);
        if (!parsed.success) {
            console.error("Error parsing orders response:", parsed.error);
            throw new Error("Invalid orders response");
        }
        return parsed.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export const GetOrderById = async (id: string): Promise<OrdersResponseType> => {
  try {
    const response = await api.get(`/orders/my-orders/${id}`);
    const parsed = OrdersResponse.safeParse(response.data);
    if (!parsed.success) {
      console.error("Error parsing orders response:", parsed.error);
      throw new Error("Invalid orders response");
    }
    return parsed.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};