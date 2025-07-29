// components/layouts/AdminPageHeader.tsx

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import React from "react";
import { AdminHeaderProps } from "src/types/ui/AdminHeader";

interface AdminPageHeaderProps {
  items: AdminHeaderProps[]
}

export function AdminHeader({ items }: AdminPageHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem
                  className={
                    index !== items.length - 1 ? "hidden md:block" : ""
                  }
                >
                  {item.isCurrent ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href || "#"}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index !== items.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
