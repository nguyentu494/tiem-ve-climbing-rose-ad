"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { GetAllPaintings } from "src/api/paintings";
import { AdminHeader } from "src/components/layout/admin-header";
import { columns } from "src/components/paintings/columns";
import { DataTable } from "src/components/paintings/data-table";
import SearchPaintings from "src/components/paintings/search-paintings";
import { Button } from "src/components/ui/button";
import { PaintingSize } from "src/enums/paintings-size.enum";
import { api } from "src/lib/axios";
import { SearchingParams } from "src/types/request/SearchParams";
import { CategoryResponse } from "src/types/response/CategoryResponse";
import { PaintingsResponse } from "src/types/response/PaintingsResponse";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";
import { debounce } from "src/utils/Debounce";

const menuHeaders: AdminHeaderProps[] = [
  {
    label: "Quản lý tranh",
    href: "/paintings",
    isCurrent: true,
  },
];

export default function PaintingsPage() {
  const router = useRouter();

  const [searchingParams, setSearchingParams] = React.useState<SearchingParams>(
    {
      page: 1,
      size: 3,
      isActive: true,
    }
  );
  const [categories, setCategories] = React.useState<CategoryResponse[]>([]);
  const [data, setData] = React.useState<PaintingsResponse | null>(null);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState(searchingParams.keyword ?? "");

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
      isActive: true  ,
      sort: "",
      page: 1,
      size: 3,
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
    const fetchData = async () => {
      const response = await GetAllPaintings(searchingParams);
      console.log("Fetched paintings data:", response);

      setData(response);
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
    fetchCategories();
  }, [searchingParams]);

  return (
    <>
      <AdminHeader items={menuHeaders} />
      <Button
        onClick={() => {
          router.push("/paintings/add-paintings");
        }}
        className="ml-2 w-sm"
      >
        Thêm
      </Button>

      <div className="container mx-auto py-10">
        <SearchPaintings
          searchParams={searchingParams}
          categories={categories}
          availableSizes={[PaintingSize.SIZE_20x20, PaintingSize.SIZE_30x30, PaintingSize.SIZE_50x70]}
          // sortOptions={sortOptions}
          activeFiltersCount={activeFiltersCount}
          keyword={keyword}
          isFilterOpen={isFilterOpen}
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

        <DataTable columns={columns} data={data?.items || []} />
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSearchingParams((prev) => ({
                ...prev,
                page: Math.max((prev.page ?? 1) - 1, 1),
              }))
            }
            disabled={searchingParams.page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSearchingParams((prev) => ({
                ...prev,
                page: Math.min((prev.page ?? 1) + 1, data?.totalPages || 1),
              }))
            }
            disabled={searchingParams.page === (data?.totalPages || 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
