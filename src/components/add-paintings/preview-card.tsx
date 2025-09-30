// src/components/add-paintings/PreviewCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "src/utils/FormatCurrency";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { useEffect, useState } from "react";

interface PreviewCardProps {
  imageUrl?: string | File;
  name?: string;
  price?: number;
  size?: string;
  categories: CategoryResponse[];
}

export function PreviewCard({
  imageUrl,
  name,
  price,
  size,
  categories,
}: PreviewCardProps) {
    const [previewSrc, setPreviewSrc] = useState<string>();

    useEffect(() => {
      if (!imageUrl) {
        setPreviewSrc(undefined);
        return;
      }

      if (typeof imageUrl === "string") {
        setPreviewSrc(imageUrl);
      } else {
        const url = URL.createObjectURL(imageUrl);
        setPreviewSrc(url);
        return () => URL.revokeObjectURL(url);
      }
    }, [imageUrl]);



  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Xem trước</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {previewSrc && (
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={previewSrc || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{name || "Tên tranh"}</h3>
          {price && price > 0 && (
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(price)}
            </p>
          )}
          {size && (
            <p className="text-sm text-muted-foreground">Kích thước: {size}</p>
          )}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <Badge
                  key={category.categoryId}
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
