"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GetAllCategories } from "src/api/category";
import { AddPaintings } from "src/api/paintings";
import { FormActions } from "src/components/add-paintings/actions";
import ArtworkForm from "src/components/add-paintings/add-form";
import PageHeader from "src/components/add-paintings/Header";
import { FormHelp } from "src/components/add-paintings/help";
import { PreviewCard } from "src/components/add-paintings/preview-card";
import { AdminHeader } from "src/components/layout/admin-header";
import { PaintingSize } from "src/enums/paintings-size.enum";
import { AddPaintingsRequest, AddPaintingsSchema } from "src/types/request/AddPaintingsRequest";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";
import { FormAddPaintings, FormAddPaintingsSchema } from "src/types/ui/FormAddPaintings";

const menuHeaders: AdminHeaderProps[] = [
  { label: "Quản lý tranh", href: "/paintings", isCurrent: false },
  { label: "Thêm mới", href: "/paintings/add-paintings", isCurrent: true },
];

export default function ImprovedAddPaintingsPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetAllCategories();
        setCategories(response);
      }
      catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const form = useForm<FormAddPaintings>({
    resolver: zodResolver(FormAddPaintingsSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: undefined,
      size: PaintingSize.SIZE_20x20,
      price: 0,
      quantity: 0,
      categoryIds: [],
    },
  });

  const watchedValues = form.watch();
  

  const onSubmit = async (values: FormAddPaintings) => {
    setIsSubmitting(true);
    try {
      const response = await AddPaintings(values);
      if(response.statusCode === 200) {
        form.reset();
      } else {
        console.error("Failed to add painting:", response.message);
      }

    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    // setIsDraft(true);
    // try {
    //   const values = form.getValues();
    //   localStorage.setItem("painting-draft", JSON.stringify(values));
    //   setLastSaved(new Date());
    // } finally {
    //   setIsDraft(false);
    // }
  };

  const selectedCategories = categories.filter((cat) =>
    watchedValues.categoryIds?.includes(cat.categoryId)
  );

  return (
    <>
      <AdminHeader items={menuHeaders} />

      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-full mx-auto px-4 py-6">
          <PageHeader lastSaved={lastSaved ?? undefined} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Main Form */}
            <div className="lg:col-span-2 overflow-y-auto pr-4">
              <ArtworkForm
                categories={categories}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                form={form}
              />
            </div>

            {/* Sidebar */}
            <div className="block lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <PreviewCard
                  imageUrl={watchedValues.imageUrl}
                  name={watchedValues.name}
                  price={watchedValues.price}
                  size={watchedValues.size}
                  categories={selectedCategories}
                />

                <FormActions
                  isSubmitting={isSubmitting}
                  isDraft={isDraft}
                  onSubmit={form.handleSubmit(onSubmit)}
                  saveDraft={saveDraft}
                />

                <FormHelp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
