"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { YuvaLogo } from "./yuva-logo";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainCategories = [
    { label: "Bath Bars", href: "/shop?category=Bath Bars" },
    { label: "Herbal Soaps", href: "/shop?category=Herbal Soaps" },
    { label: "Premium Shampoos", href: "/shop?category=Premium Shampoos" },
    { label: "Organic Skincare", href: "/shop?category=Organic Skincare" },
    { label: "Lip Care", href: "/shop?category=Lip Care" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#2E5E4E]/10 bg-[#FAF8F3]/95 backdrop-blur-md">
      {/* Top Announcement Banner */}
      <div className="bg-[#2E5E4E] px-4 py-1.5 text-center text-[11px] font-medium tracking-wider text-[#FAF8F3]">
        <span className="text-[#C9A66B] font-bold">FREE SHIPPING</span> ON ALL ORDERS OVER $50 • HANDCRAFTED BOTANICAL CARE
      </div>

      {/* Main Header Bar - 90-96px Height with Generous Spacing & Vertically Centered Logo */}
      <div className="mx-auto flex max-w-7xl min-h-[96px] items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 text-[#2E5E4E] hover:bg-[#2E5E4E]/5 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Left Nav Links - Aligned around the Logo */}
        <nav className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.15em] text-[#2E5E4E] lg:flex flex-1 justify-start">
          <Link href="/shop" className="transition hover:text-[#C9A66B]">Shop All</Link>
          <Link href="/shop?category=Bath Bars" className="transition hover:text-[#C9A66B]">Bath Bars</Link>
          <Link href="/shop?category=Herbal Soaps" className="transition hover:text-[#C9A66B]">Soaps</Link>
        </nav>

        {/* Center Official Brand Logo - Primary Visual Focus */}
        <div className="flex items-center justify-center px-4 sm:px-8 py-1 flex-shrink-0">
          <YuvaLogo variant="header" priority={true} />
        </div>

        {/* Right Nav Links & Utility Controls */}
        <div className="flex items-center gap-6 flex-1 justify-end">
          <nav className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.15em] text-[#2E5E4E] xl:flex">
            <Link href="/shop?category=Premium Shampoos" className="transition hover:text-[#C9A66B]">Shampoos</Link>
            <Link href="/shop?category=Organic Skincare" className="transition hover:text-[#C9A66B]">Skincare</Link>
            <Link href="/shop?collection=Gift Collections" className="text-[#C9A66B] font-bold transition hover:text-[#2E5E4E]">Gifts</Link>
          </nav>

          {/* Search, Wishlist & Cart Utilities */}
          <div className="flex items-center gap-3">
            <form action="/search" method="GET" className="relative hidden md:block w-40 lg:w-48">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9d6d4f]" />
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-full border border-[#2E5E4E]/15 bg-[#F6F1E9] py-1.5 pl-8 pr-3 text-xs text-[#2E5E4E] placeholder:text-[#6e6258] outline-none focus:border-[#C9A66B]"
              />
            </form>

            <Link href="/wishlist" aria-label="Wishlist" className="relative p-2 text-[#2E5E4E] hover:text-[#C9A66B] transition">
              <Heart className="h-5 w-5" />
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#2E5E4E] text-[9px] font-bold text-white">
                3
              </span>
            </Link>

            <Link href="/cart">
              <button className="flex items-center gap-1.5 rounded-full bg-[#2E5E4E] px-4 py-2 text-xs font-bold text-[#FAF8F3] shadow-sm transition hover:bg-[#C9A66B] hover:text-[#2E5E4E]">
                <ShoppingBag className="h-4 w-4 text-[#C9A66B]" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Cart</span>
                <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">2</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Category Subnav */}
      <div className="hidden border-t border-[#2E5E4E]/5 bg-[#F6F1E9]/80 lg:block py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4 text-[11px] font-bold uppercase tracking-widest text-[#2E5E4E]">
          <Link href="/shop" className="transition hover:text-[#C9A66B]">Shop All</Link>
          <Link href="/shop?collection=Best Sellers" className="transition hover:text-[#C9A66B]">Best Sellers</Link>
          <Link href="/shop?category=Bath Bars" className="transition hover:text-[#C9A66B]">Bath Bars</Link>
          <Link href="/shop?category=Herbal Soaps" className="transition hover:text-[#C9A66B]">Herbal Soaps</Link>
          <Link href="/shop?category=Premium Shampoos" className="transition hover:text-[#C9A66B]">Premium Shampoos</Link>
          <Link href="/shop?category=Organic Skincare" className="transition hover:text-[#C9A66B]">Organic Skincare</Link>
          <Link href="/shop?category=Lip Care" className="transition hover:text-[#C9A66B]">Lip Care</Link>
          <Link href="/shop?collection=Gift Collections" className="text-[#C9A66B] font-bold transition hover:text-[#2E5E4E]">Gift Collections</Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#2E5E4E]/10 bg-[#FAF8F3] px-6 py-4 lg:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3 text-xs font-bold uppercase tracking-widest text-[#2E5E4E]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop All Products</Link>
            {mainCategories.map((cat) => (
              <Link key={cat.label} href={cat.href} onClick={() => setMobileMenuOpen(false)} className="pl-3 text-[#2E5E4E]/80">
                • {cat.label}
              </Link>
            ))}
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Yuva Naturals</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>Shopping Cart</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
