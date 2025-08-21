import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import { Order } from "src/types/response/OrderResponse";
import { PreviewImage } from "../ui/preview-image";

interface PaymentInfoProps {
  orderData: Order;
}

export function PaymentInfo({ orderData }: PaymentInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-[oklch(0.808_0.114_19.571)]" />
          Thông tin thanh toán
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-sm text-muted-foreground">Phương thức thanh toán:</span>
          <p className="font-medium text-lg">{orderData.paymentMethod}</p>
        </div>

        {orderData.imagePayment && (
          <div>
            <span className="text-sm text-muted-foreground mb-2 block">
              Biên lai thanh toán:
            </span>
            <div className="border border-border rounded-lg p-2 inline-block w-[200px]">
              <PreviewImage
                src={orderData.imagePayment || "/placeholder.svg"}
                alt="Biên lai thanh toán"
                className="rounded-md object-cover"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
