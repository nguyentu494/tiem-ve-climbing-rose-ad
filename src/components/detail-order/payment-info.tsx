import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface PaymentInfoProps {
  orderData: any;
}

export function PaymentInfo({ orderData }: PaymentInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-[oklch(0.808_0.114_19.571)]" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-sm text-muted-foreground">Payment Method:</span>
          <p className="font-medium text-lg">{orderData.paymentMethod}</p>
        </div>

        {orderData.imagePayment && (
          <div>
            <span className="text-sm text-muted-foreground mb-2 block">
              Payment Receipt:
            </span>
            <div className="border border-border rounded-lg p-2 inline-block">
              <Image
                src={orderData.imagePayment || "/placeholder.svg"}
                alt="Payment Receipt"
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
