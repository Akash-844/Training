import type { Metadata } from "next";
import "./globals.css";
import SessionManager from "@/components/auth/SessionManager";
import SiteLayout from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "PriceMarket | Gold, Silver & Metal Prices",
  description: "Track live gold, silver, platinum and copper prices in India."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { document.documentElement.classList.toggle("dark", localStorage.getItem("theme") === "dark"); } catch {}` }} />
      </head>
      <body>
        <SessionManager />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
