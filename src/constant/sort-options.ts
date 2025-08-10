type SortOptionValue =
  | "price-asc"
  | "price-desc"
  | "created-asc"
  | "created-desc"
  | "order-date-asc"
  | "order-date-desc";

interface SortOption {
  value: SortOptionValue;
  label: string;
}

export const sortOptions: SortOption[] = [
  { value: "price-asc", label: "Giá tăng dần" },
  { value: "price-desc", label: "Giá giảm dần" },
  { value: "created-asc", label: "Ngày tạo tăng dần" },
  { value: "created-desc", label: "Ngày tạo giảm dần" },
];


export const sortOrderOptions: SortOption[] = [
  { value: "order-date-asc", label: "Ngày tạo tăng dần" },
  { value: "order-date-desc", label: "Ngày tạo giảm dần" },
];
