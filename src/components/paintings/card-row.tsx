import { Row } from "@tanstack/react-table";
import { AddPaintingsResponse } from "src/types/response/AddPaintingsResponse";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { Sheet, SheetTrigger } from "../ui/sheet";
import DetailPaintings from "./painting-detail";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { useForm } from "react-hook-form";
import {
  FormAddPaintings,
  FormAddPaintingsSchema,
} from "src/types/ui/FormAddPaintings";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeletePainting, updatePaintings } from "src/api/paintings";
import { usePaintingDetail } from "src/hooks/usePaintingDetail";
import { formatCurrency } from "src/utils/FormatCurrency";
import { PaintingSize } from "src/constant/paintings-size";
import { PreviewImage } from "../ui/preview-image";
import { useAppToast } from "src/hooks/useToast";
import { useRouter } from "next/navigation";
import { is } from "zod/v4/locales";
import { DeletePaintingDialog } from "./delete-painting";

type CardRowProps = {
  row: Row<AddPaintingsResponse>;
  categories: CategoryResponse[];
  onDelete: () => void;
};

export default function CardRow({ row, categories, onDelete }: CardRowProps) {
  const data = row.original;
  const { setPainting, clear } = usePaintingDetail();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { success, info } = useAppToast();
  const router = useRouter();

  const onDeletePainting = () => {
    DeletePainting(data.paintingId);
    success(
      "Xóa tranh thành công",
      "Tranh " + data.paintingId + " đã được xóa"
    );
    setIsDialogOpen(false);
    onDelete()
  };

  const onEdit = () => {
    handleRowClick(data);
    setIsOpen(true);
  };

  const form = useForm<FormAddPaintings>({
    resolver: zodResolver(FormAddPaintingsSchema),
    defaultValues: {
      name: "",
      description: "",
      active: true,
      imageUrl: undefined,
      size: PaintingSize.SIZE_20x20,
      price: 0,
      quantity: 0,
      categoryIds: [],
    },
  });

  const handleRowClick = (values: AddPaintingsResponse) => {
    setPainting(values);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      clear();
      form.reset();
    }
  };

  const onSubmit = async (values: FormAddPaintings) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting values:", values);
      const response = await updatePaintings(values, data.paintingId);
      if (response.statusCode === 200) {
        success("Cập nhật tranh thành công", "Tranh đã được cập nhật");
        form.reset();
        clear();
        setIsOpen(false);
      } else {
        console.error("Failed to update painting:", response.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <DeletePaintingDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onDeletePainting}
        paintingName={data.name}
      />
      <div className="shrink-0 mr-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
      <Card className="w-full flex gap-3 rounded-xl shadow border p-3 items-center flex-row hover:bg-secondary hover:shadow-md transition-all">
        {/* Hình ảnh nhỏ hơn */}
        <div className="flex justify-between w-full gap-3">
          <div className="relative w-18 h-18 shrink-0 rounded-lg overflow-hidden">
            <PreviewImage src={data.imageUrl} alt={data.name} />
          </div>
          {/* Nội dung */}
          <div className="flex flex-col justify-between flex-1 gap-1">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-1 ">
                {data.name}
                <div className="text-xs text-muted-foreground">
                  ({data.paintingId})
                </div>
              </CardTitle>
              {/* <p className="text-xs text-muted-foreground line-clamp-1">
              {data.description}
            </p> */}
            </div>

            {/* Badge group */}
            <div className="flex flex-wrap items-center gap-1">
              <Badge variant="outline" className="text-xs">
                {data.size}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Số lượng: {data.quantity}
              </Badge>
              {data.categories && data.categories?.length > 0 ? (
                data.categories.map((catId) => (
                  <Badge
                    key={catId.categoryId}
                    variant="default"
                    className="text-xs"
                  >
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
              <span className="text-sm font-bold text-green-600">
                {formatCurrency(data.price)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Sheet open={isOpen} onOpenChange={handleOpenChange}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRowClick(data)}
                >
                  Xem chi tiết
                </Button>
              </SheetTrigger>
              <DetailPaintings
                categories={categories}
                isSubmitting={isSubmitting}
                form={form}
                onSubmit={onSubmit}
              />
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-7 w-7 p-0 ml-1">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit()}>
                  Xem chi tiết tranh
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Xóa tranh
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    </div>
  );
}
