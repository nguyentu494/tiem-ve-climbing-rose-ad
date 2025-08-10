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

const menuHeaders: AdminHeaderProps[] = [
  {
    label: "Quản lý Danh mục",
    href: "/admin/categories",
    isCurrent: true,
  },
];

export default function CategoriesPage() {
  const { fetchCategories, categories } = useCategories();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="container mx-auto overflow-x-auto">
      <AdminHeader items={menuHeaders} />

      <div className="p-4">
        {/* Header của bảng + nút thêm */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Danh sách danh mục</h2>
          <Button className="flex items-center" onClick={() => router.push("/categories/add-category")}>
            <PlusIcon /> Thêm danh mục
          </Button>
        </div>

        {/* Bảng dữ liệu */}
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
}
