import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";

interface OrderItemsProps {
  items: any[];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-[oklch(0.808_0.114_19.571)]" />
          Order Items ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item) => (
          <div
            key={item.orderItemId}
            className="border border-border rounded-lg p-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={item.painting.imageUrl || "/placeholder.svg"}
                  alt={item.painting.name}
                  width={150}
                  height={120}
                  className="rounded-md object-cover"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {item.painting.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {item.painting.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.painting.categories.map((category: any) => (
                    <Badge
                      key={category.categoryId}
                      variant="secondary"
                      className="text-xs"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {category.name}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <p className="font-medium">{item.painting.size}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quantity:</span>
                    <p className="font-medium">{item.quantity}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Unit Price:</span>
                    <p className="font-medium">
                      ${item.currentPrice.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total:</span>
                    <p className="font-semibold text-[oklch(0.808_0.114_19.571)]">
                      ${(item.currentPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
