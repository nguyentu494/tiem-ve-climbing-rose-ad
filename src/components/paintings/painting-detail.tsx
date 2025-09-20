import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { usePaintingDetail } from "src/hooks/usePaintingDetail";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { FormAddPaintings } from "src/types/ui/FormAddPaintings";
import { PaintingBasicInfo } from "./basic-info-detail";
import CategoriesDetail from "./categories-detail";
import { ImageUploadDetail } from "./image-upload-detail";
import SpecificationsDetail from "./specification-detail";

interface ArtworkFormProps {
  onSubmit: (values: FormAddPaintings) => void;
  isSubmitting: boolean;
  categories: CategoryResponse[];
  form: UseFormReturn<FormAddPaintings>;
}

export default function DetailPaintings({
  categories,
  isSubmitting,
  form,
  onSubmit,
}: ArtworkFormProps) {

  const { painting } = usePaintingDetail();

  useEffect(() => {
    if (painting) {
      form.reset({
        name: painting.name,
        description: painting.description,
        size: painting.size,
        price: painting.price,
        active: painting.active,
        quantity: painting.quantity,
        imageUrl: painting.imageUrl,
        categoryIds: painting.categories ? painting.categories.map((category) => category.categoryId) : [],
      });
    }
  }, [painting]);

  return (
    <SheetContent
      side="right"
      className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-0"
    >
      <div className="flex flex-col h-full">
        {/* Optional: Header */}
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Chi tiết tranh</SheetTitle>
        </SheetHeader>

        {/* Nội dung cuộn được */}
        <div
          className="flex-1 overflow-y-auto p-4"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-4"
            >
              {painting && (
                <>
                  <PaintingBasicInfo
                    form={form}
                    painting={painting}
                    isSubmitting={isSubmitting}
                  />
                  <ImageUploadDetail
                    painting={painting}
                    form={form}
                    isSubmitting={isSubmitting}
                  />
                  <SpecificationsDetail
                    form={form}
                    isSubmitting={isSubmitting}
                  />
                  <CategoriesDetail form={form} categories={categories} />
                </>
              )}
              <SheetFooter className="border-t p-4">
                <Button
                  type="submit"
                  className={`${
                    isSubmitting ? "opacity-100 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang cập nhật..." : "Lưu"}
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className={`${
                      isSubmitting ? "opacity-100 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    Đóng
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </div>

        {/* Footer cố định */}
      </div>
    </SheetContent>
  );
}
