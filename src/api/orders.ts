import { OrderStatusInfo } from "src/constant/order-status";
import { useOrders } from "src/hooks/useOrders";
import { api } from "src/lib/axios";
import { OrderParams } from "src/types/request/OrderParams";
import { BaseResponseSchema } from "src/types/response/BaseResponse";
import {
  Order,
  OrderResponseSchema,
  OrderSchema,
} from "src/types/response/OrderResponse";
import z from "zod";

const OrdersResponse = BaseResponseSchema(OrderResponseSchema);

export type OrdersResponseType = z.infer<typeof OrdersResponse>;

export const GetAllOrders = async (
  params?: OrderParams
): Promise<OrdersResponseType> => {
  try {
    const response = await api.get("/orders", {
      params,
    });
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

// export const GetAllOrders = async (): Promise<> => {
//   try {
//     const response = await api.get("/paintings", {
//       params: ,
//       paramsSerializer: (params) => {
//         const searchParams = new URLSearchParams();
//         for (const key in params) {
//           const value = params[key];
//           if (Array.isArray(value)) {
//             value.forEach((val) => searchParams.append(key, String(val)));
//           } else {
//             searchParams.append(key, String(value));
//           }
//         }
//         return searchParams.toString();
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching paintings:", error);
//     throw error;
//   }
// };

export const updateOrderStatus = async (
  orderId: string,
  status: keyof typeof OrderStatusInfo
): Promise<boolean> => {
  try {
    const order = orderId.trim();
    const response = await api.put(`/orders/admin/update-status`, null, {
      params: {
        orderId: order,
        status,
      },
    });
    const parsed = OrderSchema.safeParse(response.data.data);
    if (!parsed.success) {
      console.error("Error parsing orders response:", parsed.error);
      throw new Error("Invalid orders response");
    }

    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

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

export const GetOrderByOrderId = async (OrderId: string): Promise<Order> => {
  try {
    const response = await api.get(`/orders/admin/${OrderId}`);
    const parsed = OrderSchema.safeParse(response.data.data);
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