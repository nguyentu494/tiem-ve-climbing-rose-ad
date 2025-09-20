

// src/stores/auth.store.ts
import { LogOut } from "lucide-react";
import { Login, Logout } from "src/api/auth";
import { api } from "src/lib/axios";
import { LocalStorage } from "src/lib/local-storage";
import { UserResponse } from "src/types/response/UserResponse";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: UserResponse | null;
  isAuthenticated: boolean;
  loading: boolean;

  setLoading: (loading: boolean) => void;
  login: ( user: UserResponse) => void;
  logout: () => Promise<void>;
  loadFromStorage: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      login: async (user) => {
        set({ loading: true });
        try {
          set({
            user,
            isAuthenticated: true,
          });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          const token = localStorage.getItem(LocalStorage.token);
          if (token) {
            await Logout();
          }
          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (err) {
          console.error("Logout error:", err);
        }
      },

      loadFromStorage: () => {
        const { user } = get();
        if (user) {
          set({ isAuthenticated: true });
        }
      },

      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "auth-storage",
      // Chỉ lưu token, user, isAuthenticated
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      skipHydration: true,
    }
  )
);

