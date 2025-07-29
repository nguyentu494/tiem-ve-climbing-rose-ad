"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormActions } from "src/components/add-paintings/actions";
import ArtworkForm from "src/components/add-paintings/add-form";
import PageHeader from "src/components/add-paintings/Header";
import { FormHelp } from "src/components/add-paintings/help";
import { PreviewCard } from "src/components/add-paintings/preview-card";
import { AdminHeader } from "src/components/layout/admin-header";
import { useAutoSave } from "src/hooks/use-auto-save";
import type { AdminHeaderProps } from "src/types/ui/AdminHeader";
import { formAddSchema, type FormAddData } from "src/types/ui/FormAdd";
import { formatCurrency } from "src/utils/format-currency";

const menuHeaders: AdminHeaderProps[] = [
  { label: "Quản lý tranh", href: "/paintings", isCurrent: false },
  { label: "Thêm mới", href: "/paintings/add-paintings", isCurrent: true },
];

const categories = [
  { id: "1", name: "Tranh sơn dầu", color: "bg-blue-100 text-blue-800" },
  { id: "2", name: "Tranh acrylic", color: "bg-green-100 text-green-800" },
  { id: "3", name: "Tranh màu nước", color: "bg-purple-100 text-purple-800" },
  { id: "4", name: "Tranh phong cảnh", color: "bg-orange-100 text-orange-800" },
  { id: "5", name: "Tranh chân dung", color: "bg-pink-100 text-pink-800" },
  { id: "6", name: "Tranh trừu tượng", color: "bg-indigo-100 text-indigo-800" },
];

export default function ImprovedAddPaintingsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<FormAddData>({
    resolver: zodResolver(formAddSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      size: "",
      price: 0,
      quantity: 0,
      categoryIds: [],
    },
  });

  const watchedValues = form.watch();

  // Auto-save functionality
  useAutoSave(watchedValues, (data) => {
    // Save to localStorage or API
    localStorage.setItem("painting-draft", JSON.stringify(data));
    setLastSaved(new Date());
  });

  const onSubmit = async (values: FormAddData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", values);

      // Clear draft
      localStorage.removeItem("painting-draft");

      // Redirect to success page or paintings list
      router.push("/paintings?success=true");
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    setIsDraft(true);
    try {
      const values = form.getValues();
      localStorage.setItem("painting-draft", JSON.stringify(values));
      setLastSaved(new Date());
    } finally {
      setIsDraft(false);
    }
  };

  const selectedCategories = categories.filter((cat) =>
    watchedValues.categoryIds?.includes(cat.id)
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
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 space-y-6">
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
