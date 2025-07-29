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

interface SizeInputProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SizeInput({ value, onChange, disabled }: SizeInputProps) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("cm");

  // Parse existing value
  useState(() => {
    if (value) {
      const match = value.match(/(\d+)\s*x\s*(\d+)\s*(cm|mm|inch)?/i);
      if (match) {
        setWidth(match[1]);
        setHeight(match[2]);
        setUnit(match[3] || "cm");
      }
    }
  });

  const updateValue = (
    newWidth: string,
    newHeight: string,
    newUnit: string
  ) => {
    if (newWidth && newHeight) {
      onChange(`${newWidth}x${newHeight} ${newUnit}`);
    } else {
      onChange("");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Rộng"
        value={width}
        onChange={(e) => {
          setWidth(e.target.value);
          updateValue(e.target.value, height, unit);
        }}
        disabled={disabled}
        className="flex-1"
      />
      <span className="text-muted-foreground">×</span>
      <Input
        placeholder="Cao"
        value={height}
        onChange={(e) => {
          setHeight(e.target.value);
          updateValue(width, e.target.value, unit);
        }}
        disabled={disabled}
        className="flex-1"
      />
      <Select
        value={unit}
        onValueChange={(value) => {
          setUnit(value);
          updateValue(width, height, value);
        }}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cm">cm</SelectItem>
          <SelectItem value="mm">mm</SelectItem>
          <SelectItem value="inch">inch</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
