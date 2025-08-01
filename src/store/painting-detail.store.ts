import { AddPaintingsResponse } from "src/types/response/AddPaintingsResponse";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PaintingDetailState {
  painting: AddPaintingsResponse | null;
  setPainting: (painting: AddPaintingsResponse) => void;
  updatePainting: (data: Partial<AddPaintingsResponse>) => void;
  clear: () => void;
}


export const paintingDetailStore = create<PaintingDetailState>((set) => ({
  painting: null,

  setPainting: (painting) =>
    set((state) => ({
      ...state,
      painting,
    })),

  updatePainting: (data) =>
    set(
      (state) =>
        state.painting
          ? {
              ...state,
              painting: {
                ...state.painting,
                ...data,
              },
            }
          : state // hoặc { ...state, painting: null }
    ),

  clear: () => set((state) => ({ ...state, painting: null })),
}));
