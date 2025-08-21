import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, User, Phone, Mail, MapPin } from "lucide-react";

interface ShippingInfoProps {
  orderData: any;
}

export function ShippingInfo({ orderData }: ShippingInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-[oklch(0.808_0.114_19.571)]" />
          Shipping Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Receiver:</span>
                <p className="font-medium">{orderData.receiverName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Phone:</span>
                <p className="font-medium">{orderData.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Email:</span>
                <p className="font-medium">{orderData.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <span className="text-sm text-muted-foreground">Address:</span>
                <div className="font-medium space-y-1">
                  <p>{orderData.address}</p>
                  <p>
                    {orderData.town}, {orderData.city}
                  </p>
                  <p>
                    {orderData.prefecture} {orderData.postalCode}
                  </p>
                  {orderData.addressDetail && (
                    <p className="text-muted-foreground text-sm">
                      {orderData.addressDetail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
