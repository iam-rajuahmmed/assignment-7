import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body
        suppressHydrationWarning
        className={`${notoSansBengali.variable} antialiased min-h-screen flex flex-col bg-slate-50`}
      >
        <Suspense fallback={<div className="h-16 bg-white w-full"></div>}>
          <Navbar />
        </Suspense>
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-6">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
