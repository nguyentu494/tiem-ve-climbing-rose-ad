import { useCategoriesStore } from "src/store/categories.store";

export const useCategories = () => {
  const { categories, fetchCategories, clearCategories } = useCategoriesStore();
  return { categories, fetchCategories, clearCategories };
};
