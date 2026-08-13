"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { YuvaLogo } from "./yuva-logo";
import { useCart } from "@/context/cart-context";

export function SiteHeader() {
  const { totalItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const mainLeftLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Bath Bars", href: "/shop?category=Bath Bars" },
    { label: "Shampoos", href: "/shop?category=Premium Shampoos" },
    { label: "Skincare", href: "/shop?category=Organic Skincare" },
    { label: "Cookies", href: "/cookies" },
  ];

  const subNavLinks = [
    { label: "BATH BARS", href: "/shop?category=Bath Bars" },
    { label: "HERBAL SOAPS", href: "/shop?category=Herbal Soaps" },
    { label: "PREMIUM SHAMPOOS", href: "/shop?category=Premium Shampoos" },
    { label: "ORGANIC SKINCARE", href: "/shop?category=Organic Skincare" },
    { label: "LIP CARE", href: "/shop?category=Lip Care" },
    { label: "COOKIES", href: "/cookies" },
    { label: "GIFT COLLECTIONS", href: "/shop?collection=Gift Collections" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FCFAF5]/98 border-b border-[#173F32]/10 shadow-xs backdrop-blur-md">
      {/* 1. Announcement Bar (~32px) */}
      <div className="bg-[#0D2F25] h-[32px] px-4 flex items-center justify-center text-[11px] font-medium tracking-[0.16em] uppercase text-[#FCFAF5]">
        <span>FREE SHIPPING ON ORDERS ABOVE ₹5000 &nbsp;&bull;&nbsp; <span className="text-[#C9A45C]">HANDCRAFTED BOTANICAL CARE</span></span>
      </div>

      {/* 2. Main Navigation Row (~76px desktop, 60px mobile) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[60px] lg:h-[76px] flex items-center justify-between">
        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#173F32] hover:text-[#C9A45C] transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Left Nav (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#173F32] flex-1 justify-start">
          {mainLeftLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-[#C9A45C] py-1">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center Logo - Clean, No white box container, mix-blend-multiply */}
        <div className="flex items-center justify-center px-2 py-0 flex-shrink-0">
          <YuvaLogo variant="header" priority={true} />
        </div>

        {/* Right Controls (Desktop & Mobile) */}
        <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-end">
          {/* Search Trigger */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#173F32] hover:text-[#C9A45C] transition flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] font-semibold"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
              <span>SEARCH</span>
            </button>

            {searchOpen && (
              <form action="/search" method="GET" className="absolute right-0 top-full mt-2 w-64 bg-[#FCFAF5] p-2 border border-[#173F32]/15 shadow-xl rounded-md z-50">
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search botanical products..."
                  autoFocus
                  className="w-full bg-[#F7F2E8] px-3 py-1.5 text-xs text-[#20251F] outline-none border border-[#173F32]/20 focus:border-[#C9A45C] rounded-sm"
                />
              </form>
            )}
          </div>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="text-[#173F32] hover:text-[#C9A45C] transition flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] font-semibold"
          >
            <Heart className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">WISHLIST</span>
          </Link>

          {/* Account */}
          <Link
            href="/shop"
            aria-label="Account"
            className="hidden md:flex text-[#173F32] hover:text-[#C9A45C] transition items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] font-semibold"
          >
            <User className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">ACCOUNT</span>
          </Link>

          {/* Cart Button */}
          <Link href="/cart">
            <button className="flex items-center gap-1.5 rounded-full bg-[#173F32] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FCFAF5] transition hover:bg-[#0D2F25]">
              <ShoppingBag className="h-3.5 w-3.5 text-[#C9A45C]" />
              <span className="hidden sm:inline">CART</span>
              <span className="ml-0.5 rounded-full bg-[#C9A45C] px-1.5 py-0.2 text-[10px] font-bold text-[#0D2F25]">
                {totalItemsCount}
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* 3. Secondary Category Navigation Row (~42px desktop only) */}
      <div className="hidden lg:block border-y border-[#173F32]/10 bg-[#F7F2E8]/60 h-[42px]">
        <div className="mx-auto flex max-w-7xl h-full items-center justify-center gap-6 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#173F32]">
          {subNavLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition hover:text-[#C9A45C] ${item.label === "COOKIES" ? "text-[#C9A45C] font-bold" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#173F32]/10 bg-[#FCFAF5] px-6 py-5 lg:hidden animate-in fade-in duration-200 shadow-xl">
          <nav className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#173F32]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop All</Link>
            <Link href="/cookies" onClick={() => setMobileMenuOpen(false)} className="text-[#C9A45C] font-bold">• Wholesome Cookies</Link>
            <Link href="/shop?category=Bath Bars" onClick={() => setMobileMenuOpen(false)}>• Bath Bars</Link>
            <Link href="/shop?category=Herbal Soaps" onClick={() => setMobileMenuOpen(false)}>• Herbal Soaps</Link>
            <Link href="/shop?category=Premium Shampoos" onClick={() => setMobileMenuOpen(false)}>• Premium Shampoos</Link>
            <Link href="/shop?category=Organic Skincare" onClick={() => setMobileMenuOpen(false)}>• Organic Skincare</Link>
            <Link href="/shop?category=Lip Care" onClick={() => setMobileMenuOpen(false)}>• Lip Care</Link>
            <Link href="/shop?collection=Gift Collections" onClick={() => setMobileMenuOpen(false)}>• Gift Collections</Link>
            <div className="pt-3 border-t border-[#173F32]/10 flex flex-col gap-2">
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-[#6E716A]">Our Story</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-[#6E716A]">Contact</Link>
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="text-[#173F32] font-bold">Cart ({totalItemsCount})</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

