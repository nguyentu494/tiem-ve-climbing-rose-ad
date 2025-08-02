import { useOrdersStore } from "src/store/orders.store";

export const useOrders = () => {
  const { orders, fetchOrders, clearOrders, updateOrderStatusInTable } =
    useOrdersStore();
  return { orders, fetchOrders, clearOrders, updateOrderStatusInTable };
};
