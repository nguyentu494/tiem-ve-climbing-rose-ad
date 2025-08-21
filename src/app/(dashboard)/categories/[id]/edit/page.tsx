import { use } from "react";
import CategoryCreatePage from "src/components/categories/create-category";

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <CategoryCreatePage categoryId={id} />;
}
