// src/store/orders/orders.store.ts
import { GetAllCategories } from "src/api/categories";
import { GetAllOrders } from "src/api/orders";
import { OrderParams } from "src/types/request/OrderParams";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { OrderResponse } from "src/types/response/OrderResponse";
import { create } from "zustand";

interface CategoriesState {
  categories: CategoryResponse[];
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  clearCategories: () => void;
//   updateOrderStatusInTable: (orderId: string, status: string) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
    categories: [],
    loading: false,
    error: null,
    
    fetchCategories: async () => {
        try {
        set({ loading: true, error: null });
        const res = await GetAllCategories(); // API của bạn
        set({ categories: res.data || [], loading: false });
        } catch (err: any) {
        set({ loading: false, error: err.message || "Lỗi khi load categories" });
        }
    },
    
    clearCategories: () => set({ categories: [], loading: false, error: null }),
    
    // updateOrderStatusInTable: (orderId: string, status: string) => {
    //     set((state) => ({
    //     categories: state.categories.map((category) =>
    //         category.orderId === orderId ? { ...category, status } : category
    //     ),
    //     }));
    // },
}));
