"use client";

import { useEffect, useState } from "react";
import { GetAllOrders } from "src/api/orders";
import { columns } from "src/components/orders/columns";
import { DataTable } from "src/components/orders/data-table";
import { useOrders } from "src/hooks/useOrders";
import { OrderResponse } from "src/types/response/OrderResponse";

export default function OrdersPage() {
  const { fetchOrders, orders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);    

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
