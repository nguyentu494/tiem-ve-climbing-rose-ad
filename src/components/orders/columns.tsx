"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { OrderResponse } from "src/types/response/OrderResponse";
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
import { OrderStatusInfo } from "src/constant/order-status";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<OrderResponse>[] = [
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
    header: () => <div className="">Tên người nhận</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div className="">Số điện thoại</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="">Phương thức tt</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("paymentMethod")}</div>;
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
    header: () => <div className="text-center">Minh chứng tt</div>,
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
    accessorKey: "status",
    header: () => <div className="text-center">Trạng thái</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as
        | keyof typeof OrderStatusInfo
        | undefined;
      const show = OrderStatusInfo[status ?? "PENDING"];
      const isDisabled =
        status === "PENDING" ||
        status === "REJECTED" ||
        status === "CANCELED" ||
        status === "APPROVED";

      return (
        <div
          className={`text-center font-bold rounded-4xl items-center justify-center 
              ${show.color}
              ${show.bgColor}`}
        >
          <Select
            value={status}
            // onValueChange={handleStatusChange}
            disabled={isDisabled}
          >
            <SelectTrigger className="text-sm justify-center w-full border-none shadow-none disabled:opacity-70 pt-0 pb-0 disabled:[&_svg]:hidden">
              {show.label}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="APPROVED">Duyệt đơn</SelectItem>
              <SelectItem value="REJECTED">Từ chối</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
