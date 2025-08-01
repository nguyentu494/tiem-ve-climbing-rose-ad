import { Row } from "@tanstack/react-table";
import { AddPaintingsResponse } from "src/types/response/AddPaintingsResponse";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

type CardRowProps = {
  row: Row<AddPaintingsResponse>;
};

export default function CardRow({ row }: CardRowProps) {
  const data = row.original;


  return (
    <div className="flex items-center justify-between">
      <div className="shrink-0 mr-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
      <Card className="w-full flex gap-3 rounded-xl shadow border p-3 items-center flex-row">
        {/* Hình ảnh nhỏ hơn */}
        <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Nội dung */}
        <div className="flex flex-col justify-between flex-1 gap-1.5">
          <div>
            <CardTitle className="text-base font-semibold">
              {data.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {data.description}
            </p>
          </div>

          {/* Badge group */}
          <div className="flex flex-wrap items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {data.size}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Số lượng: {data.quantity}
            </Badge>
            {data.categories?.length > 0 ? (
              data.categories.map((catId) => (
                <Badge key={catId.categoryId} variant="default" className="text-xs">
                  {catId.name}
                </Badge>
              ))
            ) : (
              <Badge variant="destructive" className="text-xs">
                Chưa có danh mục
              </Badge>
            )}
          </div>

          {/* Giá và nút */}
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-green-600">
              {data.price.toLocaleString("ja-JP", {
                style: "currency",
                currency: "JPY",
              })}
            </span>
            <div className="flex items-center">
              <Button size="sm">Chi tiết</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-7 w-7 p-0 ml-1">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      navigator.clipboard.writeText(data.paintingId)
                    }
                  >
                    Copy painting ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View painting details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
