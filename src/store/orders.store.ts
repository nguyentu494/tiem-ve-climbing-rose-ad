// src/store/orders/orders.store.ts
import { GetAllOrders } from "src/api/orders";
import { OrderResponse } from "src/types/response/OrderResponse";
import { create } from "zustand";

interface OrdersState {
  orders: OrderResponse[];
  loading: boolean;
  error: string | null;

  fetchOrders: () => Promise<void>;
  clearOrders: () => void;
  updateOrderStatusInTable: (orderId: string, status: string) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    try {
      set({ loading: true, error: null });
      const res = await GetAllOrders(); // API của bạn
      set({ orders: res.data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Lỗi khi load orders" });
    }
  },

  clearOrders: () => set({ orders: [] }),

  updateOrderStatusInTable: (orderId: string, status: string) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      ),
    }));
  },
}));
