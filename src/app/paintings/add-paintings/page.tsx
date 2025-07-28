"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "src/components/ui/button";
import { AdminHeader } from "src/components/layout/AdminHeader";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";

const menuHeaders: AdminHeaderProps[] = [
    {
        label: "Quản lý tranh",
        href: "/paintings",
        isCurrent: false
    },
    {
        label: "Thêm mới",
        href: "/paintings/add-paintings",
        isCurrent: true
    }
]

export default function AddPaintingsPage() {

  return (
    <>
      <AdminHeader items={menuHeaders} />
    </>
  );
}
