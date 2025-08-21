import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface OrderInfoProps {
  orderData: any;
}

export function OrderInfo({ orderData }: OrderInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[oklch(0.808_0.114_19.571)]" />
          Order Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orderData.note && (
          <div>
            <h4 className="font-medium text-foreground mb-2">Special Notes</h4>
            <p className="text-muted-foreground bg-muted p-3 rounded-md">
              {orderData.note}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Shipping Address
            </h4>
            <p className="text-muted-foreground text-sm">
              {orderData.shippingAddress}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-1">Payment Method</h4>
            <p className="text-muted-foreground text-sm">
              {orderData.paymentMethod}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
