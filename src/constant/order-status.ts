export type OrderStatus = 'PENDING' | 'APPROVED' | 'PAYED' | 'REJECTED' | 'CANCELED';

// Centralized status constants to avoid typos and enable reuse
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  PAYED: 'PAYED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
} as const;

export const OrderStatusInfo: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string }
> = {
  PENDING: {
    label: "Đang chờ duyệt",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
  },
  APPROVED: {
    label: "Đã duyệt",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  PAYED: {
    label: "Đã thanh toán",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  REJECTED: {
    label: "Đã từ chối",
    color: "text-red-700",
    bgColor: "bg-red-100",
  },
  CANCELED: {
    label: "Đã hủy",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
  },
};
