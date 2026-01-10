"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarData } from "../../constant/sidebar-menu"
import Logo from "../../assets/avt.webp"
import Image from "next/image"
import { useAuthStore } from "src/store/auth.store"

type MyData = {
  user: { name: string; email: string; avatar: string };
  navMain: { title: string; url: string; icon: any; isActive: boolean }[];
  projects: { id: string; name: string }[]; // ✅ THÊM DÒNG NÀY
};

const data = sidebarData;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  // Prepare user data for NavUser component
  const userData = {
    name: user?.username || user?.displayName || "Admin User",
    email: user?.email || "admin@example.com",
    avatar: user?.avatar || "/avatars/default.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center relative rounded-full">
                  <Image
                    src={Logo}
                    alt="Logo"
                    className="object-cover rounded-full"
                    fill
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-primary">
                    Tiệm Vẽ Climping Rose
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
