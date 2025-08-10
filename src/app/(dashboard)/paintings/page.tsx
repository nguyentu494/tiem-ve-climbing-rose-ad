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

const menuHeaders: AdminHeaderProps[] = [
  {
    label: "Quản lý tranh",
    href: "/admin/paintings",
    isCurrent: true,
  },
];

export default function PaintingsPage() {
  const router = useRouter();

  const [searchingParams, setSearchingParams] = React.useState<SearchingParams>(
    {
      page: 1,
      size: 6,
      isActive: true,
    }
  );
  const [categories, setCategories] = React.useState<CategoryResponse[]>([]);
  const [data, setData] = React.useState<PaintingsResponse | null>(null);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState(searchingParams.keyword ?? "");
  const [isLoading, setIsLoading] = React.useState(true);

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
    setIsLoading(true);
    const fetchData = async () => {
      const response = await GetAllPaintings(searchingParams);
      setData(response);
      setIsLoading(false);
    };
    fetchData();
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchingParams]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <AdminHeader items={menuHeaders} />

      <div className="container mx-auto py-0 flex flex-col">
        <Button
          onClick={() => {
            router.push("/paintings/add-paintings");
          }}
          className="self-end mb-2"
        >
          + Thêm
        </Button>
        <div></div>
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
              {Array.from({ length: data?.totalPages || 1 }, (_, index) => {
                const pageNumber = index + 1;
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
