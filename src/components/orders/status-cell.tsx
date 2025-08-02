import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { OrderStatusInfo } from "src/constant/order-status";
import { updateOrderStatus } from "src/api/orders";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/animation/loading-component.json";
import React from "react";
import { useOrders } from "src/hooks/useOrders";
type Props = {
  orderId: string;
  status: keyof typeof OrderStatusInfo;
  disabled: boolean;
};

export const StatusSelectCell = ({ orderId, status, disabled }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { updateOrderStatusInTable } = useOrders();

  const show = OrderStatusInfo[status ?? "PENDING"];

  const handleStatusChange = async (value: string) => {
    try {
      setIsLoading(true);
      const isCheck = await updateOrderStatus(
        orderId,
        value as keyof typeof OrderStatusInfo
      );
      if (isCheck) {
        updateOrderStatusInTable(
          orderId,
          value as keyof typeof OrderStatusInfo
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`text-center font-bold rounded-4xl items-center justify-center md:w-36
        ${show.color}
        ${show.bgColor}`}
    >
      {isLoading ? (
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="w-6 h-6 mx-auto"
        />
      ) : (
        <Select
          value={status}
          onValueChange={handleStatusChange}
          disabled={disabled}
        >
          <SelectTrigger className="text-sm justify-center w-full border-none shadow-none disabled:opacity-70 pt-0 pb-0 disabled:[&_svg]:hidden">
            {show.label}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="APPROVED">Duyệt đơn</SelectItem>
            <SelectItem value="REJECTED">Từ chối</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
