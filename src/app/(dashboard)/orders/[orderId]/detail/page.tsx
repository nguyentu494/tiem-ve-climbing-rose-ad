"use client";

import { use, useEffect, useState } from "react";
import { GetOrderByOrderId } from "src/api/orders";
import { OrderDetailPage } from "src/components/detail-order/order-detail-page";
import { AdminHeader } from "src/components/layout/admin-header";
import { Order } from "src/types/response/OrderResponse";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";

export default function DetailOrder({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);

  const [orderData, setOrderData] = useState<Order>();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await GetOrderByOrderId(orderId);
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const menuHeaders: AdminHeaderProps[] = [
    {
      label: "Quản lý đơn hàng",
      href: "/orders",
      isCurrent: false,
    },
    {
      label: `Chi tiết đơn hàng`,
      href: `/orders/${orderId}`,
      isCurrent: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader items={menuHeaders} />
      {orderData && <OrderDetailPage orderData={orderData} />}
    </div>
  );
}
