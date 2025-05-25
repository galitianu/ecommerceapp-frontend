import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Description from "@/components/common/Description/Description";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: " Haine faine - Magazin de haine online",
  description:
    "Haine faine este un magazin online de haine care oferă o gamă variată de produse de îmbrăcăminte pentru toate vârstele și stilurile. Descoperă cele mai noi tendințe în modă și bucură-te de reduceri exclusive.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" id="root">
      <body>
        <Providers>
          <Header />
          <Toaster />
          {children}
          <Description />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
