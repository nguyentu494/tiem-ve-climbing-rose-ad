"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "src/components/ui/button";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";
import { AdminHeader } from "src/components/layout/admin-header";
import { columns } from "src/components/paintings/columns";
import { DataTable } from "src/components/paintings/data-table";
import { AddPaintingsResponse } from "src/types/response/PaintingsRespose";
import { GetAllPaintings } from "src/api/paintings";

const menuHeaders: AdminHeaderProps[] = [
  {
    label: "Quản lý tranh",
    href: "/paintings",
    isCurrent: true,
  },
];



export default function PaintingsPage() {
  const router = useRouter();

  const [data, setData] = React.useState<AddPaintingsResponse[]>([]);
  React.useEffect(() => {
    // Fetch data from API or any other source
    const fetchData = async () => {
      const response = await GetAllPaintings();
      const result = await response.data.items;
      console.log(response)
      setData(result);
    };
    fetchData();
  }, []);

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
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
