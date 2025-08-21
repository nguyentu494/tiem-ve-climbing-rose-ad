import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Receipt, Truck, Tag, DollarSign } from "lucide-react";

interface OrderSummaryProps {
  orderData: any;
}

export function OrderSummary({ orderData }: OrderSummaryProps) {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-[oklch(0.808_0.114_19.571)]" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Paintings Total:</span>
            </div>
            <span className="font-medium">
              ${orderData.totalPaintingsPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Delivery Cost:</span>
            </div>
            <span className="font-medium">
              ${orderData.deliveryCost.toFixed(2)}
            </span>
          </div>

          {orderData.discount > 0 && (
            <div className="flex items-center justify-between text-green-600">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span className="text-sm">Discount:</span>
              </div>
              <span className="font-medium">
                -${orderData.discount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-[oklch(0.808_0.114_19.571)]">
            ${orderData.totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="mt-6 p-4 bg-[oklch(0.808_0.114_19.571)]/10 rounded-lg border border-[oklch(0.808_0.114_19.571)]/20">
          <h4 className="font-medium text-[oklch(0.808_0.114_19.571)] mb-2">
            Order Status
          </h4>
          <p className="text-sm text-muted-foreground">
            Your order is currently{" "}
            <strong>{orderData.status.toLowerCase()}</strong>. You will receive
            updates via email and SMS.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
