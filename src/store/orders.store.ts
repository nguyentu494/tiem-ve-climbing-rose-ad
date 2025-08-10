// src/store/orders/orders.store.ts
import { GetAllOrders } from "src/api/orders";
import { OrderParams } from "src/types/request/OrderParams";
import { OrderResponse } from "src/types/response/OrderResponse";
import { create } from "zustand";

interface OrdersState {
  orders: OrderResponse;
  loading: boolean;
  error: string | null;

  fetchOrders: (params?: OrderParams) => Promise<void>;
  clearOrders: () => void;
  updateOrderStatusInTable: (orderId: string, status: string) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: {
    items: [],
    page: 0,
    size: 0,
    totalPages: 0,
    totalItems: 0,
  },
  loading: false,
  error: null,

  fetchOrders: async (params?: OrderParams) => {
    try {
      set({ loading: true, error: null });
      const res = await GetAllOrders(params); // API của bạn
      set({ orders: res.data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Lỗi khi load orders" });
    }
  },

  clearOrders: () => set({ orders: {
    items: [],
    page: 0,
    size: 0,
    totalPages: 0,
    totalItems: 0,
  } }),

  updateOrderStatusInTable: (orderId: string, status: string) => {
    set((state) => ({
      orders: {
        ...state.orders,
        items: state.orders.items.map((order) =>
          order.orderId === orderId ? { ...order, status } : order
        ),
      },
    }));
  },
}));
