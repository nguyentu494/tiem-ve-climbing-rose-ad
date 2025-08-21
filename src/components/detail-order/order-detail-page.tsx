import { OrderHeader } from "./order-header";
import { OrderInfo } from "./order-info";
import { ShippingInfo } from "./shipping-info";
import { PaymentInfo } from "./payment-info";
import { Order } from "src/types/response/OrderResponse";
import { OrderItems } from "./order-items";
import { OrderSummary } from "./order-summary";

interface OrderDetailPageProps {
  orderData: Order;
}

export function OrderDetailPage({ orderData }: OrderDetailPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <OrderHeader
        orderId={orderData.orderId}
        orderDate={orderData.orderDate}
        status={orderData.status}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <OrderInfo orderData={orderData} />
          <OrderItems items={orderData.orderItems} />
          <ShippingInfo orderData={orderData} />
          <PaymentInfo orderData={orderData} />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary orderData={orderData} />
        </div>
      </div>
    </div>
  );
}
