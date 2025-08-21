import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { OrderStatusInfo } from "src/constant/order-status";
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

export const StatusSelectCell = ({ orderId, status, disabled }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { updateOrderStatusInTable } = useOrders();
  const { success, errorToast, info } = useAppToast();

  const show = OrderStatusInfo[status ?? "PENDING"];
  console.log(status, "hjh");

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
            <SelectItem
              value="APPROVED"
              className={`${status === "PAYED" ? "block" : "hidden"}`}
            >
              Duyệt đơn
            </SelectItem>
            <SelectItem
              value="REJECTED"
              className={`${status === "PAYED" ? "block" : "hidden"}`}
            >
              Từ chối
            </SelectItem>
            <SelectItem
              value="CANCELED"
              className={`${status === "PENDING" ? "block" : "hidden"}`}
            >
              Hủy đơn
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
