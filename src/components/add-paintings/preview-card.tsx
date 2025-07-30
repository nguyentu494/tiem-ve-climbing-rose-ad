// src/components/add-paintings/PreviewCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "src/utils/FormatCurrency";

interface PreviewCardProps {
  imageUrl?: string;
  name?: string;
  price?: number;
  size?: string;
  categories: { id: string; name: string }[];
}

export function PreviewCard({
  imageUrl,
  name,
  price,
  size,
  categories,
}: PreviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Xem trước</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {imageUrl && (
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{name || "Tên tranh"}</h3>
          {price && price > 0 && (
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(price)} VNĐ
            </p>
          )}
          {size && (
            <p className="text-sm text-muted-foreground">Kích thước: {size}</p>
          )}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="text-xs"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
