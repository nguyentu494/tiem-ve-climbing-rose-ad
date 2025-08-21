"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CategorySchhema } from "src/types/request/CategoryRequest";
import { useEffect, useState } from "react";
import {
  AddCategory,
  getCategoryById,
  UpdateCategory,
} from "src/api/categories";
import { ImageUpload } from "src/components/ui/image-upload";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { useAppToast } from "src/hooks/useToast";

interface CategoryCreatePageProps {
  categoryId?: string;
}

export default function CategoryCreatePage({
  categoryId,
}: CategoryCreatePageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { success, errorToast } = useAppToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof CategorySchhema>>({
    resolver: zodResolver(CategorySchhema),
    defaultValues: {
      categoryCode: "",
      name: "",
      description: "",
      imageUrl: "",
      active: true,
    },
  });

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      getCategoryById(categoryId)
        .then((data: CategoryResponse) => {
          form.reset({
            categoryCode: data.categoryCode,
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            active: data.active,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [categoryId, form]);

  const imageUrl = form.watch("imageUrl");

  const onSubmit = async (values: z.infer<typeof CategorySchhema>) => {
    setIsSubmitting(true);
    try {
      if (categoryId) {
        await UpdateCategory(categoryId, values);
        success(
          "Cập nhật danh mục thành công",
          "Danh mục " + values.name + " đã được cập nhật"
        );
      } else {
        await AddCategory(values);
        success(
          "Thêm danh mục thành công",
          "Danh mục " + values.name + " đã được thêm"
        );
      }
      router.push("/categories");
    } catch (error) {
      console.error("Submit error:", error);
      errorToast("Có lỗi xảy ra", "Vui lòng kiểm tra lại thông tin");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Nút quay lại */}
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại
      </Button>

      <h1 className="text-2xl font-semibold">Thêm danh mục mới</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="categoryCode"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã danh mục</FormLabel>
                <FormControl>
                  <Input placeholder="VD: PC, PHAT..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên danh mục</FormLabel>
                <FormControl>
                  <Input placeholder="Phong cảnh, Động vật..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea placeholder="Nhập mô tả danh mục..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={imageUrl}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="active"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Đang hoạt động</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang lưu..." : "Lưu danh mục"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => form.reset()}
            >
              Hủy
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
