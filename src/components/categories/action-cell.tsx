// CategoryActionsCell.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { DeleteCategoryDialog } from "./delete-category";
import { DeleteCategory } from "src/api/categories";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { useRouter } from "next/navigation";
import { useAppToast } from "src/hooks/useToast";

interface CategoryActionsCellProps {
  category: CategoryResponse;
}

export function CategoryActionsCell({ category }: CategoryActionsCellProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { success } = useAppToast();
  const router = useRouter();

  const onDelete = () => {
    DeleteCategory(category.categoryId);
    success(
      "Xóa danh mục thành công",
      "Danh mục " + category.categoryId + " đã được xóa"
    );
    router.refresh();
  };

  const onEdit = () => {
    router.push(`/categories/${category.categoryId}/edit`);
  };

  return (
    <>
      <DeleteCategoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onDelete}
        categoryName={category.name}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              onEdit();
            }}
          >
            Chỉnh sửa danh mục
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setIsDialogOpen(true)}
          >
            Xóa danh mục
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
