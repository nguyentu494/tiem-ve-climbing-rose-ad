"use client";

import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PageTransitionWrapper } from "../transition-wrapper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LocalStorage } from "src/lib/local-storage";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/animation/loading-page.json";
import { useAuth } from "src/hooks/useAuth";
import { Toaster } from "sonner";
import { useAppToast } from "src/hooks/useToast";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const { warning } = useAppToast();

  const [isLoading, setIsLoading] = useState(false);
  const { loading, setLoading } = useAuth();

  useEffect(() => {
    setIsLoading(false);
    const token = localStorage.getItem(LocalStorage.token);
    if (!token) {
      router.replace("/login");
    }
    setIsLoading(true);
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem(LocalStorage.token);
    
    if (!token) {
      setIsLoading(false);
      warning("Phiên đăng nhập đã hết hạn", "Vui lòng đăng nhập lại để tiếp tục.");
      router.push("/login");
    }
  }, [loading]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {isLoading === false || loading ? (
            <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
              <Lottie animationData={loadingAnimation} loop size={12} />
              <p className="text-sm text-primary">Đang tải...</p>
            </div>
          ) : (
            <SidebarProvider>
              <AppSidebar />
              <Toaster position="top-right" richColors closeButton />
              <SidebarInset>
                <PageTransitionWrapper>{children}</PageTransitionWrapper>
              </SidebarInset>
            </SidebarProvider>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
