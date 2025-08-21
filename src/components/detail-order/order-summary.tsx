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
          Tóm tắt đơn hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Tổng giá trị tranh:</span>
            </div>
            <span className="font-medium">
              ¥ {orderData.totalPaintingsPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Phí giao hàng:</span>
            </div>
            <span className="font-medium">
              ¥ {orderData.deliveryCost.toFixed(2)}
            </span>
          </div>

          {orderData.discount > 0 && (
            <div className="flex items-center justify-between text-green-600">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span className="text-sm">Giảm giá:</span>
              </div>
              <span className="font-medium">
                -¥ {orderData.discount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Tổng giá trị đơn hàng:</span>
          <span className="text-[oklch(0.808_0.114_19.571)]">
            ¥ {orderData.totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="mt-6 p-4 bg-[oklch(0.808_0.114_19.571)]/10 rounded-lg border border-[oklch(0.808_0.114_19.571)]/20">
          <h4 className="font-medium text-[oklch(0.808_0.114_19.571)] mb-2">
            Trạng thái đơn hàng
          </h4>
          <p className="text-sm text-muted-foreground">
            Đơn hàng của bạn hiện đang{" "}
            <strong>{orderData.status.toLowerCase()}</strong>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
