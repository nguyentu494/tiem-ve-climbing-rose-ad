"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SortAscIcon, SortDescIcon } from "lucide-react";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { formatDatetime } from "src/utils/FormatDatetime";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PreviewImage } from "../ui/preview-image";
import { CategoryActionsCell } from "./action-cell";



export const columns: ColumnDef<CategoryResponse>[] = [
  {
    accessorKey: "categoryCode",
    header: "Mã danh mục",
    cell: ({ row }) => {
      const categoryCode = row.getValue("categoryCode");
      return (
        <div className="flex items-center gap-2 w-24">
          <span className="font-medium">
            {typeof categoryCode === "string" && categoryCode}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên danh mục",
    cell: ({ row }) => {
      const name = row.getValue("name");
      return <div>{typeof name === "string" && name}</div>;
    },
  },
  {
    accessorKey: "imageUrl",
    header: () => <div className="blockk">Hình ảnh</div>,
    cell: ({ row }) => {
      return (
        <div className="block w-16 h-16 relative cursor-pointer">
          {row.getValue("imageUrl") ? (
            <PreviewImage src={row.getValue("imageUrl")} alt="Category Image" />
          ) : (
            "Không có"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="">Mô tả</div>,
    cell: ({ row }) => {
      const description = row.getValue("description");
      return (
        <div
          className="w-96 break-words whitespace-normal line-clamp-2"
          title={description as string}
        >
          {typeof description === "string" && description}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Ngày tạo{" "}
        {column.getIsSorted()
          ? column.getIsSorted() === "asc"
            ? <SortAscIcon size={18} />
            : <SortDescIcon size={18} />
          : ""}
      </button>
    ),
    cell: ({ row }) => {
      return (
        <div className="">{formatDatetime(row.getValue("createdAt"))}</div>
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <CategoryActionsCell category={row.original} key={row.id} />
      );
    },
  },
];
