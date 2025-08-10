"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, MoreHorizontal, SortAscIcon, SortDescIcon } from "lucide-react";
import { OrderStatusInfo } from "src/constant/order-status";
import { formatCurrency } from "src/utils/FormatCurrency";
import { formatDatetime } from "src/utils/FormatDatetime";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { Order } from "src/types/response/OrderResponse";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { PreviewImage } from "../ui/preview-image";

export const columns: ColumnDef<CategoryResponse>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     const status = row.getValue("status") as
  //       | keyof typeof OrderStatusInfo
  //       | undefined;

  //     const show = status === "PAYED";
  //     return (
  //       <div>
  //         {show ? (
  //           <Checkbox
  //             checked={row.getIsSelected()}
  //             onCheckedChange={(value) => row.toggleSelected(!!value)}
  //             aria-label="Select row"
  //           />
  //         ) : null}
  //       </div>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.paintingId)}
            >
              Copy painting ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View painting details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
