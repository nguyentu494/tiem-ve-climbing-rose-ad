"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CategoryCreatePage() {
  const [form, setForm] = useState({
    categoryCode: "",
    name: "",
    description: "",
    imageUrl: "",
    active: true,
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // TODO: call API add category
    console.log("Submit form", form);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Thêm danh mục mới</h1>

      {/* Mã danh mục */}
      <div className="space-y-2">
        <Label htmlFor="categoryCode">Mã danh mục</Label>
        <Input
          id="categoryCode"
          value={form.categoryCode}
          onChange={(e) => handleChange("categoryCode", e.target.value)}
          placeholder="VD: PC, PHAT..."
        />
      </div>

      {/* Tên danh mục */}
      <div className="space-y-2">
        <Label htmlFor="name">Tên danh mục</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Phong cảnh, Động vật..."
        />
      </div>

      {/* Mô tả */}
      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Nhập mô tả danh mục..."
        />
      </div>

      {/* Ảnh */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Hình ảnh</Label>
        <Input
          id="imageUrl"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              handleChange("imageUrl", url);
            }
          }}
        />
        {form.imageUrl && (
          <div className="mt-2">
            <img
              src={form.imageUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}
      </div>

      {/* Trạng thái */}
      <div className="flex items-center space-x-2">
        <Switch
          checked={form.active}
          onCheckedChange={(val) => handleChange("active", val)}
        />
        <Label>Đang hoạt động</Label>
      </div>

      {/* Nút */}
      <div className="flex space-x-4">
        <Button onClick={handleSubmit}>Lưu</Button>
        <Button variant="outline">Hủy</Button>
      </div>
    </div>
  );
}
