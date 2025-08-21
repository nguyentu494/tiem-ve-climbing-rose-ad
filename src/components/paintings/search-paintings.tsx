"use client";

import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { SearchingParams } from "src/types/request/PaintingParams";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { PaintingSize } from "src/constant/paintings-size";

interface ProductFilterBarProps {
  searchParams: SearchingParams;
  categories: CategoryResponse[];
  availableSizes: PaintingSize[];
  sortOptions?: { value: string; label: string }[];
  activeFiltersCount: number;
  isFilterOpen: boolean;
  keyword?: string;
  quantity?: number;
  setIsFilterOpen: (open: boolean) => void;
  handleSearchChange: (val: string) => void;
  handleKeywordChange: (val: string) => void;
  handleCategoryChange: (id: string, checked: boolean) => void;
  handleSizeChange: (size: string, checked: boolean) => void;
  handleActiveChange: (val: boolean) => void;
  handleSortChange: (val: string) => void;
  clearFilters: () => void;
  getSelectedCategoryNames: () => string[];
  setSearchParams: React.Dispatch<React.SetStateAction<any>>;
}

const SIZE_LABELS: Record<string, string> = {
  SIZE_20x20: "20x20 cm",
  SIZE_30x40: "30x40 cm",
  SIZE_40x50: "40x50 cm",
  ART_SUPPLIES: "Kèm dụng cụ vẽ",
};

export default function SearchPaintings({
  searchParams,
  categories,
  availableSizes,
  sortOptions,
  activeFiltersCount,
  keyword,
  isFilterOpen,
  quantity,
  setIsFilterOpen,
  handleKeywordChange,
  handleCategoryChange,
  handleSizeChange,
  handleActiveChange,
  handleSortChange,
  clearFilters,
  getSelectedCategoryNames,
  setSearchParams,
}: ProductFilterBarProps) {
  return (
    <div>
      <Card className="p-4 mr-3">
        <div className="flex flex-wrap items-center gap-4">
          {/* Keyword */}
          <div className="flex items-center gap-2 min-w-0 ">
            <Label className="text-sm font-medium whitespace-nowrap">
              Từ khóa:
            </Label>
            <Input
              placeholder="Nhập từ khóa..."
              value={keyword ?? ""}
              onChange={(e) => handleKeywordChange(e.target.value)}
              className="w-40"
            />
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium whitespace-nowrap">
              Danh mục:
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between min-w-[140px] bg-transparent"
                >
                  {searchParams.categoryIds &&
                  searchParams.categoryIds.length > 0 ? (
                    <span className="truncate">
                      {searchParams.categoryIds.length === 1
                        ? getSelectedCategoryNames()[0]
                        : `${searchParams.categoryIds.length} danh mục`}
                    </span>
                  ) : (
                    "Chọn danh mục"
                  )}
                  <ChevronDown className="h-4 w-4 ml-2 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.categoryId}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`category-${category.categoryId}`}
                        checked={
                          searchParams.categoryIds &&
                          searchParams.categoryIds.includes(category.categoryId)
                        }
                        onCheckedChange={(checked) =>
                          handleCategoryChange(
                            category.categoryId,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`category-${category.categoryId}`}
                        className="text-sm cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Sizes */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium whitespace-nowrap">
              Kích thước:
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between min-w-[80px] bg-transparent"
                >
                  {searchParams.sizes && searchParams.sizes.length > 0 ? (
                    <span className="truncate">
                      {searchParams.sizes.length === 1
                        ? SIZE_LABELS[searchParams.sizes[0]] ??
                          searchParams.sizes[0]
                        : `${searchParams.sizes.length} lựa chọn`}
                    </span>
                  ) : (
                    "Chọn size"
                  )}
                  <ChevronDown className="h-4 w-4 ml-2 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 max-h-60 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {availableSizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={searchParams.sizes?.includes(size)}
                        onCheckedChange={(checked) =>
                          handleSizeChange(size, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="text-sm cursor-pointer"
                      >
                        {SIZE_LABELS[size] ?? size}
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Status */}
          <div className="flex items-center gap-2">
            <Label
              htmlFor="active-status"
              className="text-sm font-medium whitespace-nowrap"
            >
              Đang bán:
            </Label>
            <Switch
              id="active-status"
              checked={searchParams.isActive === true}
              onCheckedChange={handleActiveChange}
            />
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium whitespace-nowrap">
              Sắp xếp:
            </Label>
            <Select value={searchParams.sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Chọn" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions &&
                  sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Filter */}
          <div className="lg:hidden ml-auto">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Bộ lọc
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
                  <SheetDescription>
                    Sử dụng các bộ lọc để tìm sản phẩm phù hợp
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Từ khóa</Label>
                    <Input
                      placeholder="Nhập từ khóa..."
                      value={searchParams.keyword ?? ""}
                      onChange={(e) => handleKeywordChange(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Danh mục</Label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category.categoryId}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`mobile-category-${category.categoryId}`}
                            checked={
                              searchParams.categoryIds &&
                              searchParams.categoryIds.includes(
                                category.categoryId
                              )
                            }
                            onCheckedChange={(checked) =>
                              handleCategoryChange(
                                category.categoryId,
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            htmlFor={`mobile-category-${category.categoryId}`}
                            className="text-sm cursor-pointer"
                          >
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Kích thước</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-size-${size}`}
                            checked={
                              searchParams.sizes &&
                              searchParams.sizes.includes(size)
                            }
                            onCheckedChange={(checked) =>
                              handleSizeChange(size, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`mobile-size-${size}`}
                            className="text-sm cursor-pointer"
                          >
                            {size}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              onClick={clearFilters}
              size="sm"
              className="ml-auto bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Xóa bộ lọc ({activeFiltersCount})
            </Button>
          )}
        </div>
      </Card>

      <div className="flex items-center justify-between mr-4">
        {activeFiltersCount > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">
              Bộ lọc đang áp dụng:
            </span>
            {getSelectedCategoryNames().map((name) => (
              <Badge
                key={name}
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() => {
                  const category = categories.find((c) => c.name === name);
                  if (category)
                    handleCategoryChange(category.categoryId, false);
                }}
              >
                {name}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            {searchParams.sizes &&
              searchParams.sizes.map((size) => (
                <Badge
                  key={size}
                  variant="secondary"
                  className="gap-1 cursor-pointer"
                  onClick={() => handleSizeChange(size, false)}
                >
                  Size {size}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            {searchParams.isActive !== undefined && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() =>
                  setSearchParams((prev: any) => ({
                    ...prev,
                    isActive: undefined,
                  }))
                }
              >
                Đang bán
                <X className="h-3 w-3" />
              </Badge>
            )}
            {searchParams.sort && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() => handleSortChange("")}
              >
                {sortOptions &&
                  sortOptions.find((opt) => opt.value === searchParams.sort)
                    ?.label}
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}
        {quantity !== undefined && (
          <div className="mt-2 text-sm text-muted-foreground">
            Tổng số tranh: <span className="font-semibold">{quantity}</span>
          </div>
        )}
      </div>
    </div>
  );
}
