import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MobileNavbar } from "@/components/mobile-navbar";
import { DesktopNavbar } from "@/components/desktop-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WatchLog - Track Your Movies & Shows",
  description: "Record and review your favorite movies and TV shows",
  manifest: "/manifest.json",
  // themeColor: "#1A1A1A",
  generator: "v0.dev",
};

export const viewport = {
  themeColor: "#1A1A1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <DesktopNavbar className="hidden md:flex" />
            <main className="flex-1 container mx-auto px-4 py-4 md:py-6">{children}</main>
            <MobileNavbar className="md:hidden" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
