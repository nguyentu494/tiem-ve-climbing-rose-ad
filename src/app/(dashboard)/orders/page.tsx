"use client";

import { o } from "node_modules/framer-motion/dist/types.d-Cjd591yU";
import { useEffect, useState } from "react";
import { GetAllOrders } from "src/api/orders";
import { AdminHeader } from "src/components/layout/admin-header";
import { columns } from "src/components/orders/columns";
import { DataTable } from "src/components/orders/data-table";
import { Label } from "src/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "src/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select";
import { sortOrderOptions } from "src/constant/sort-options";
import { useOrders } from "src/hooks/useOrders";
import { OrderParams } from "src/types/request/OrderParams";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";

const menuHeaders: AdminHeaderProps[] = [
  {
    label: "Quản lý đơn hàng",
    href: "/orders",
    isCurrent: true,
  },
];

export default function OrdersPage() {
  const { fetchOrders, orders } = useOrders()
  const [orderParams, setOrderParams] = useState<OrderParams>({ page: 1, size: 12, sort: "order-date-desc" });

  useEffect(() => {
    fetchOrders(orderParams);
  }, [orderParams]);

  const handleSortChange = (value: string) => {
    setOrderParams((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  return (
    <div className="container mx-auto overflow-x-auto">
      <AdminHeader items={menuHeaders} />
      <div className="p-4">
        <div className="flex items-center gap-2 justify-end">
          <Label className="text-sm font-medium whitespace-nowrap">
            Sắp xếp:
          </Label>
          <Select value={orderParams.sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Chọn" />
            </SelectTrigger>
            <SelectContent>
              {sortOrderOptions &&
                sortOrderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <DataTable columns={columns} data={orders.items} />
        <div className="flex items-center justify-end space-x-2 py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setOrderParams((prev) => ({
                      ...prev,
                      page: Math.max((prev.page ?? 1) - 1, 1),
                    }))
                  }
                  aria-disabled={orderParams.page === 1}
                  className={
                    orderParams.page === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>{" "}
              {Array.from({ length: orders?.totalPages || 1 }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === (orderParams.page ?? 1);
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={isActive}
                      onClick={() =>
                        setOrderParams((prev) => ({
                          ...prev,
                          page: pageNumber,
                        }))
                      }
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setOrderParams((prev) => ({
                      ...prev,
                      page: Math.min(
                        (prev.page ?? 1) + 1,
                        orders?.totalPages || 1
                      ),
                    }))
                  }
                  aria-disabled={orderParams.page === (orders?.totalPages || 1)}
                  className={
                    orderParams.page === (orders?.totalPages || 1)
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
