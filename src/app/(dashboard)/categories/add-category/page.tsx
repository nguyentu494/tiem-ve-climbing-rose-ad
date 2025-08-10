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
import { useState } from "react";
import { AddCategory } from "src/api/categories";
import { ImageUpload } from "src/components/ui/image-upload";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CategoryCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit = async (values: z.infer<typeof CategorySchhema>) => {
    console.log("Submit form", values);
    setIsSubmitting(true);
    try {
      const response = await AddCategory(values);
      if (response.statusCode === 200) {
        console.log("Category added successfully:", response.data);
        form.reset();
        // router.back();
      } else {
        console.error("Failed to add category:", response.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    value={field.value}
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
