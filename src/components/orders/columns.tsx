"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import { StatusSelectCell } from "./status-cell";
import Image from "next/image";
import { Order } from "src/types/response/OrderResponse";
import { PreviewImage } from "../ui/preview-image";

export const columns: ColumnDef<Order>[] = [
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
    cell: ({ row }) => {
      const status = row.getValue("status") as
        | keyof typeof OrderStatusInfo
        | undefined;

      const show = status === "PAYED";
      return (
        <div>
          {show ? (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ) : null}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: "Mã order",
    cell: ({ row }) => {
      const order = row.getValue("orderId");
      return (
        <div
          className="flex items-center gap-2 w-24"
          title={order as string}
        >
          <span className="font-medium">
            {typeof order === "string" && order.length > 8
              ? `${order.slice(0, 4)}...${order.slice(-5)}`
              : String(order)}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "orderDate",
    header: "Ngày đặt hàng",
    cell: ({ row }) => {
      const date = row.getValue("orderDate");
      return (
        <div>
          {typeof date === "string" && date ? formatDatetime(date) : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "receiverName",
    header: () => <div className="hidden lg:block">Tên người nhận</div>,
    cell: ({ row }) => {
      return (
        <div className="hidden lg:block">{row.getValue("receiverName")}</div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="">Số điện thoại</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="hidden lg:block">Phương thức tt</div>,
    cell: ({ row }) => {
      return (
        <div className="hidden lg:block">{row.getValue("paymentMethod")}</div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text">Tổng tiền</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalPrice"));
      const formatted = formatCurrency(price);

      return <div className="text font-bold text-rose-500">{formatted}</div>;
    },
  },
  {
    accessorKey: "imagePayment",
    header: () => (
      <div className="text-center hidden lg:block">Minh chứng tt</div>
    ),
    cell: ({ row }) => {
      const image = row.getValue("imagePayment");

      return (
        <div className="text-center hidden lg:block text-sm text-gray-500">
          {image ? (
            <PreviewImage
              src={image as string}
              alt="Payment proof"
              className="w-14  object-cover rounded-md mx-auto"
            />
          ) : (
            "Không có"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Trạng thái</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof OrderStatusInfo;
      const orderId = row.getValue("orderId") as string;

      const isDisabled =
        status === "PENDING" ||
        status === "REJECTED" ||
        status === "CANCELED" ||
        status === "APPROVED";

      return (
        <StatusSelectCell
          orderId={orderId}
          status={status as keyof typeof OrderStatusInfo}
          disabled={isDisabled}
        />
      );
    },
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
