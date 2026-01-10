"use client";

import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { GetAllPaintings } from "src/api/paintings";
import { AdminHeader } from "src/components/layout/admin-header";
import { columns } from "src/components/paintings/columns";
import { DataTable } from "src/components/paintings/data-table";
import SearchPaintings from "src/components/paintings/search-paintings";
import { Button } from "src/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "src/components/ui/pagination";
import { sortOptions } from "src/constant/sort-options";
import { api } from "src/lib/axios";
import { SearchingParams } from "src/types/request/PaintingParams";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { PaintingsResponse } from "src/types/response/PaintingsResponse";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";
import { debounce } from "src/utils/Debounce";
import loadingAnimation from "../../../../public/animation/loading-component.json";
import { PaintingSize } from "src/constant/paintings-size";
import { useCategories } from "src/hooks/useCategories";
import { PlusIcon } from "lucide-react";
import { useAppToast } from "src/hooks/useToast";

const menuHeaders: AdminHeaderProps[] = [
  {
    label: "Quản lý tranh",
    href: "/paintings",
    isCurrent: true,
  },
];

// Helper function to calculate pagination range (max 5 pages)
const getPaginationRange = (currentPage: number, totalPages: number) => {
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    // If total pages <= 5, show all pages
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Calculate start and end of the range
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);

  // Adjust start if we're near the end
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default function PaintingsPage() {
  const router = useRouter();
  const { success } = useAppToast();

  const { fetchCategories, categories } = useCategories();

  const [searchingParams, setSearchingParams] = React.useState<SearchingParams>(
    {
      page: 1,
      size: 6,
      isActive: true,
    }
  );
  const [data, setData] = React.useState<PaintingsResponse | null>(null);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState(searchingParams.keyword ?? "");
  const [isLoading, setIsLoading] = React.useState(true);

  const refetchPaintings = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await GetAllPaintings(searchingParams);
      setData(response);
    } finally {
      setIsLoading(false);
    }
  }, [searchingParams]);


  React.useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, [fetchCategories]);

  const handleSearchChange = (value: string) => {
    setSearchingParams((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const debouncedSetKeyword = React.useMemo(
    () =>
      debounce((value: string) => {
        setSearchingParams((prev) => ({
          ...prev,
          keyword: value,
          page: 1,
        }));
      }, 500),
    []
  );

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    debouncedSetKeyword(value);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSearchingParams((prev) => ({
      ...prev,
      categoryIds: checked
        ? [...(prev.categoryIds ?? []), categoryId]
        : (prev.categoryIds ?? []).filter((id) => id !== categoryId),
      page: 1,
    }));
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    setSearchingParams((prev) => ({
      ...prev,
      sizes: checked
        ? [...(prev.sizes ?? []), size]
        : (prev.sizes ?? []).filter((s) => s !== size),
      page: 1,
    }));
  };

  const handleActiveChange = (checked: boolean) => {
    setSearchingParams((prev) => ({
      ...prev,
      isActive: checked,
      page: 1,
    }));
  };

  const handleSortChange = (value: string) => {
    setSearchingParams((prev) => ({ ...prev, sort: value, page: 1 }));
  };

  const clearFilters = () => {
    setSearchingParams({
      search: "",
      keyword: "",
      categoryIds: [],
      sizes: [],
      isActive: true,
      sort: "",
      page: 1,
      size: 6,
    });
  };

  const activeFiltersCount =
    (searchingParams.categoryIds?.length ?? 0) +
    (searchingParams.sizes?.length ?? 0) +
    (searchingParams.isActive !== undefined ? 1 : 0) +
    (searchingParams.sort ? 1 : 0);

  const getSelectedCategoryNames = () => {
    return categories
      .filter((cat) => searchingParams.categoryIds?.includes(cat.categoryId))
      .map((cat) => cat.name);
  };

  React.useEffect(() => {
    // Fetch data from API or any other source
    refetchPaintings();

    // Smooth scroll to top when page changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchingParams]);


  return (
    <div className="container mx-auto overflow-x-auto">
      <AdminHeader items={menuHeaders} />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Danh sách tranh</h2>
          <Button
            className="flex items-center"
            onClick={() => router.push("/paintings/add-paintings")}
          >
            <PlusIcon /> Thêm tranh
          </Button>
        </div>
        <SearchPaintings
          searchParams={searchingParams}
          categories={categories}
          availableSizes={Object.values(PaintingSize)}
          sortOptions={sortOptions}
          activeFiltersCount={activeFiltersCount}
          keyword={keyword}
          isFilterOpen={isFilterOpen}
          quantity={data?.totalItems || 0}
          setIsFilterOpen={setIsFilterOpen}
          handleSearchChange={handleSearchChange}
          handleKeywordChange={handleKeywordChange}
          handleCategoryChange={handleCategoryChange}
          handleSizeChange={handleSizeChange}
          handleActiveChange={handleActiveChange}
          handleSortChange={handleSortChange}
          clearFilters={clearFilters}
          getSelectedCategoryNames={getSelectedCategoryNames}
          setSearchParams={setSearchingParams}
        />

        {isLoading ? (
          <div className="flex items-center justify-center h- flex-col ">
            <Lottie animationData={loadingAnimation} loop className="size-48" />
            <p className="text-sm text-primary">Đang tải dữ liệu...</p>
          </div>
        ) : data?.items.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Không có tranh nào được tìm thấy.</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={data?.items || []}
            categories={categories}
            refetchPaintings={refetchPaintings}
          />
        )}

        <div className="flex items-center justify-end space-x-2 py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setSearchingParams((prev) => ({
                      ...prev,
                      page: Math.max((prev.page ?? 1) - 1, 1),
                    }))
                  }
                  aria-disabled={searchingParams.page === 1}
                  className={
                    searchingParams.page === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>{" "}

              {/* Show first page if not in range */}
              {getPaginationRange(searchingParams.page ?? 1, data?.totalPages || 1)[0] > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      isActive={false}
                      onClick={() =>
                        setSearchingParams((prev) => ({
                          ...prev,
                          page: 1,
                        }))
                      }
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-3 py-2">...</span>
                  </PaginationItem>
                </>
              )}

              {/* Page numbers */}
              {getPaginationRange(searchingParams.page ?? 1, data?.totalPages || 1).map((pageNumber) => {
                const isActive = pageNumber === (searchingParams.page ?? 1);
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={isActive}
                      onClick={() =>
                        setSearchingParams((prev) => ({
                          ...prev,
                          page: pageNumber,
                        }))
                      }
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {/* Show last page if not in range */}
              {getPaginationRange(searchingParams.page ?? 1, data?.totalPages || 1).slice(-1)[0] < (data?.totalPages || 1) && (
                <>
                  <PaginationItem>
                    <span className="px-3 py-2">...</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      isActive={false}
                      onClick={() =>
                        setSearchingParams((prev) => ({
                          ...prev,
                          page: data?.totalPages || 1,
                        }))
                      }
                    >
                      {data?.totalPages || 1}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setSearchingParams((prev) => ({
                      ...prev,
                      page: Math.min(
                        (prev.page ?? 1) + 1,
                        data?.totalPages || 1
                      ),
                    }))
                  }
                  aria-disabled={
                    searchingParams.page === (data?.totalPages || 1)
                  }
                  className={
                    searchingParams.page === (data?.totalPages || 1)
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
