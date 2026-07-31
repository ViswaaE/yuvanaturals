import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "YUVA Naturals | Luxury Handmade Botanical Skincare",
  description: "Editorial luxury skincare and artisanal bath bars crafted with goat milk, active botanicals, and high-potency flora elixirs.",
  icons: {
    icon: "/api/logo",
    shortcut: "/api/logo",
    apple: "/api/logo",
  },
  openGraph: {
    title: "YUVA Naturals | Luxury Handmade Botanical Skincare",
    description: "Editorial luxury skincare and artisanal bath bars crafted with goat milk, active botanicals, and high-potency flora elixirs.",
    type: "website",
    locale: "en_US",
  },
};

import { CartProvider } from "@/context/cart-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F3] text-[#1F332B] font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
