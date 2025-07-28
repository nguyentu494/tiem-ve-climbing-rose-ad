"use client"

import * as React from "react"
import { useRouter } from "next/navigation";
import { Button } from "src/components/ui/button";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";
import { AdminHeader } from "src/components/layout/AdminHeader";

const menuHeaders: AdminHeaderProps[] = [
    {
        label: "Quản lý tranh",
        href: "/paintings",
        isCurrent: true
    }
]

export default function PaintingsPage() {
  const router = useRouter();
  

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
      </>
    );
}
