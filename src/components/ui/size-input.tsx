"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaintingSize } from "src/enums/paintings-size.enum";

interface SizeInputProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SizeInput({ value, onChange, disabled }: SizeInputProps) {
  const paintingSizes = Object.values(PaintingSize);

  // Parse existing value
  // useState(() => {
  //   if (value) {
  //     const match = value.match(/(\d+)\s*x\s*(\d+)\s*(cm|mm|inch)?/i);
  //     if (match) {
  //       setWidth(match[1]);
  //       setHeight(match[2]);
  //       setUnit(match[3] || "cm");
  //     }
  //   }
  // });


  return (
    <div className="flex items-center space-x-2">
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-[150px]">
          {value || "Chọn size"}
        </SelectTrigger>
        <SelectContent>
          {paintingSizes.map((size) => (
            <SelectItem key={size} value={size}>
              {size !== PaintingSize.ART_SUPPLIES ? size.replace("SIZE_", "").replace("x", "x") : "Bộ dụng cụ"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
