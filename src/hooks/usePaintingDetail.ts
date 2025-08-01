import { paintingDetailStore } from "src/store/painting-detail.store";

export const usePaintingDetail = () => {
  const painting = paintingDetailStore((state) => state.painting);
  const setPainting = paintingDetailStore((state) => state.setPainting);
  const updatePainting = paintingDetailStore((state) => state.updatePainting);
  const clear = paintingDetailStore((state) => state.clear);

  return {
    painting,
    setPainting,
    updatePainting,
    clear,
  };
};
