"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { formatCurrency } from "src/utils/FormatCurrency";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function CurrencyInput({
  value,
  onChange,
  disabled,
  placeholder,
}: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    onChange(Number(rawValue));
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={value ? formatCurrency(value) : ""}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className="pr-12"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        ¥
      </div>
    </div>
  );
}
