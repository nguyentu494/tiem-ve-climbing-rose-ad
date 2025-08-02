"use client";

import { useEffect, useState } from "react";
import { GetAllOrders } from "src/api/orders";
import { AdminHeader } from "src/components/layout/admin-header";
import { columns } from "src/components/orders/columns";
import { DataTable } from "src/components/orders/data-table";
import { useOrders } from "src/hooks/useOrders";
import { OrderResponse } from "src/types/response/OrderResponse";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";

const menuHeaders: AdminHeaderProps[] = [
  {
    label: "Quản lý đơn hàng",
    href: "/admin/orders",
    isCurrent: true,
  },
];

export default function OrdersPage() {
  const { fetchOrders, orders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);    

  return (
    <div className="container mx-auto overflow-x-auto">
      <AdminHeader items={menuHeaders} />
      <div className="p-4">
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
}
