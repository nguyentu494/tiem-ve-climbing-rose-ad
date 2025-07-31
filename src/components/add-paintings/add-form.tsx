// components/artwork-form/ArtworkForm.tsx
import { Form } from "@/components/ui/form";
import BasicInfoSection from "./basic-info";
import ImageUploadSection from "./image-upload";
import SpecificationsSection from "./specifications";
import CategoriesSection from "./catgories";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { AddPaintingsRequest } from "src/types/request/AddPaintingsRequest";
import { UseFormReturn } from "react-hook-form";
import { AddPaintingsResponse } from "src/types/response/AddPaintingsResponse";
import { FormAddPaintings } from "src/types/ui/FormAddPaintings";



interface ArtworkFormProps {
  onSubmit: (values: FormAddPaintings) => void;
  isSubmitting: boolean;
  categories: CategoryResponse[];
  form: UseFormReturn<FormAddPaintings>;
}

export default function ArtworkForm({
  onSubmit,
  isSubmitting,
  categories,
  form,
}: ArtworkFormProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection form={form} />
          <ImageUploadSection form={form} isSubmitting={isSubmitting} />
          <SpecificationsSection form={form} isSubmitting={isSubmitting} />
          <CategoriesSection form={form} categories={categories} />
        </form>
      </Form>
    </div>
  );
}
