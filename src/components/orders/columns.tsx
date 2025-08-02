"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { AddPaintingsResponse } from "src/types/response/AddPaintingsResponse";
import { Payment } from "src/app/(dashboard)/orders/page";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "paintingId",
    header: "Mã order",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày đặt hàng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "size",
    header: () => <div className="text-right">Tên người nhận</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Số điện thoại</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Tổng tiền</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("total_price"));
      const formatted = new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Phương thức tt</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Minh chứng tt</div>,
    // cell: ({ row }) => {
    //   const price = parseFloat(row.getValue("total_price"));
    //   const formatted = new Intl.NumberFormat("ja-JP", {
    //     style: "currency",
    //     currency: "JPY",
    //   }).format(price);

    //   return <div className="text-right font-medium">{formatted}</div>;
    // },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
