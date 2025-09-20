import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { ORDER_STATUS, OrderStatusInfo } from "src/constant/order-status";
import { updateOrderStatus } from "src/api/orders";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/animation/loading-component.json";
import React from "react";
import { useOrders } from "src/hooks/useOrders";
import { toast } from "sonner";
import { useAppToast } from "src/hooks/useToast";
type Props = {
  orderId: string;
  status: keyof typeof OrderStatusInfo;
  disabled: boolean;
};

// Build available status options based on current status
function getNextStatusOptions(currentStatus: keyof typeof OrderStatusInfo) {
  return [
    {
      value: ORDER_STATUS.APPROVED,
      label: "Duyệt đơn",
      visible: currentStatus === ORDER_STATUS.PAYED,
    },
    {
      value: ORDER_STATUS.REJECTED,
      label: "Từ chối",
      visible: currentStatus === ORDER_STATUS.PAYED,
    },
    {
      value: ORDER_STATUS.CANCELED,
      label: "Hủy đơn",
      visible: currentStatus === ORDER_STATUS.PENDING,
    },
  ];
}

export const StatusSelectCell = ({ orderId, status, disabled }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { updateOrderStatusInTable } = useOrders();
  const { success, errorToast, info } = useAppToast();

  const show = OrderStatusInfo[status ?? ORDER_STATUS.PENDING];

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
        success("Cập nhật trạng thái đơn hàng thành công", "Đơn hàng " + orderId + " đã được cập nhật");
        return;
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      errorToast(
        "Cập nhật trạng thái đơn hàng không thành công",
        "Đơn hàng " + orderId + " không được cập nhật"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex text-center font-bold rounded-4xl items-center justify-center 
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
            {getNextStatusOptions(status).map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className={opt.visible ? "block" : "hidden"}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
