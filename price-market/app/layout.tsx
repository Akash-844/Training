import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/elements/Navbar";

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
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
