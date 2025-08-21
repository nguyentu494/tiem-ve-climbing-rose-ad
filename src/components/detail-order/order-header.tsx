import { Badge } from "@/components/ui/badge";
import { Calendar, Package } from "lucide-react";

interface OrderHeaderProps {
  orderId: string;
  orderDate: string;
  status: string;
}

export function OrderHeader({ orderId, orderDate, status }: OrderHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-[oklch(0.808_0.114_19.571)] text-white";
      case "approved":
        return "bg-green-500 text-white";
      case "payed":
        return "bg-blue-500 text-white";
      case "cancelled":
        return "bg-gray-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="border-b border-border pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chi tiết đơn hàng</h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span className="font-mono text-sm">{orderId}</span>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2">
          <Badge className={getStatusColor(status)}>{status}</Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(orderDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
