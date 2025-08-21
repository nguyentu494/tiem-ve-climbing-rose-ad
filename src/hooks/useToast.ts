// src/hooks/useAppToast.ts
"use client";

import { toast } from "sonner";

export function useAppToast() {
  const success = (message: string, description?: string) => {
    toast.success(message, { description });
  };

  const errorToast = (message: string, description?: string) => {
    toast.error(message, { description });
  };

  const warning = (message: string, description?: string) => {
    toast.warning(message, { description });
  };

  const info = (message: string, description?: string) => {
    toast(message, { description });
  };

  return { success, errorToast, warning, info };
}
