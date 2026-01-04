"use client";

import { useEffect } from "react";
import { columns } from "src/components/categories/columns";
import { DataTable } from "src/components/categories/data-table";
import { AdminHeader } from "src/components/layout/admin-header";
import { useCategories } from "src/hooks/useCategories";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { useAppToast } from "src/hooks/useToast";

const menuHeaders: AdminHeaderProps[] = [
  {
    label: "Quản lý Danh mục",
    href: "/categories",
    isCurrent: true,
  },
];

export default function CategoriesPage() {
  const { fetchCategories, categories } = useCategories();
  const router = useRouter();
  const { info } = useAppToast();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onAddCategory = () => {
    info("Đang chuyển sang trang thêm danh mục", "Vui lòng đợi...");
    router.push("/categories/add-category");
  };

  return (
    <div className="container mx-auto overflow-x-auto">
      <AdminHeader items={menuHeaders} />

      <div className="p-4">
        {/* Header của bảng + nút thêm */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Danh sách danh mục</h2>
          <Button className="flex items-center" onClick={() => onAddCategory()}>
            <PlusIcon /> Thêm danh mục
          </Button>
        </div>

        {/* Bảng dữ liệu */}
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
}
