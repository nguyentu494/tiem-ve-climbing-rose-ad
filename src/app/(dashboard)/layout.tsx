"use client";

import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PageTransitionWrapper } from "../transition-wrapper";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LocalStorage } from "src/lib/local-storage";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LocalStorage.token);
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <PageTransitionWrapper>{children}</PageTransitionWrapper>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
