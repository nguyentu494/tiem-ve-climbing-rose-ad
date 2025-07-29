"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files && files[0]) {
        handleFileUpload(files[0]);
      }
    },
    [disabled]
  );

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setIsUploading(true);

    // Simulate upload - replace with actual upload logic
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative group">
          <div className="relative aspect-video w-full max-w-md mx-auto overflow-hidden rounded-lg border">
            <img
              src={value || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onChange("")}
                disabled={disabled}
              >
                <X className="w-4 h-4 mr-2" />
                Xóa ảnh
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={disabled || isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-muted rounded-full">
              {isUploading ? (
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {isUploading
                  ? "Đang tải lên..."
                  : "Kéo thả ảnh vào đây hoặc click để chọn"}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP tối đa 10MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
