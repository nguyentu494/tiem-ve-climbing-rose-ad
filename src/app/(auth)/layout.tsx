"use client";

import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { PageTransitionWrapper } from "../transition-wrapper";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
