import { useOrdersStore } from "src/store/orders.store";

export const useOrders = () => {
  const { orders, fetchOrders, clearOrders } = useOrdersStore();
  return { orders, fetchOrders, clearOrders };
};
