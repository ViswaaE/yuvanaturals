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

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Bath Bars", href: "/shop?category=Bath Bars" },
    { label: "Shampoos", href: "/shop?category=Premium Shampoos" },
    { label: "Skincare", href: "/shop?category=Organic Skincare" },
    { label: "Lip Care", href: "/shop?category=Lip Care" },
    { label: "Cookies", href: "/cookies" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FCFAF5]/98 border-b border-stone-200/80 shadow-xs backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-[#173F32] h-[32px] px-4 flex items-center justify-center text-[11px] font-medium tracking-[0.14em] uppercase text-[#FCFAF5]">
        <span>FREE SHIPPING ON ORDERS ABOVE ₹5000 &bull; HANDCRAFTED BOTANICAL CARE</span>
      </div>

      {/* Main Header Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[60px] lg:h-[68px] flex items-center justify-between gap-4">
        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#173F32] hover:text-[#C9A45C] transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Left: Official YUVA NATURALS Logo */}
        <div className="flex items-center flex-shrink-0">
          <YuvaLogo variant="header" priority={true} />
        </div>

        {/* Center Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-medium text-[#173F32]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-colors hover:text-[#C9A45C] py-1 ${
                link.label === "Cookies" ? "font-semibold text-[#173F32]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons: Search, Account, Wishlist, Cart */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-shrink-0 justify-end">
          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 text-[#173F32] hover:text-[#C9A45C] transition flex items-center gap-1 text-[12px] font-medium"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden xl:inline">Search</span>
            </button>

            {searchOpen && (
              <form
                action="/shop"
                method="GET"
                className="absolute right-0 top-full mt-2 w-64 bg-white p-2 border border-stone-200 shadow-lg rounded-md z-50"
              >
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-full bg-[#FCFAF5] px-3 py-1.5 text-xs text-[#173F32] outline-none border border-stone-300 focus:border-[#173F32] rounded-sm"
                />
              </form>
            )}
          </div>

          {/* Account */}
          <Link
            href="/shop"
            aria-label="Account"
            className="p-1 text-[#173F32] hover:text-[#C9A45C] transition flex items-center gap-1 text-[12px] font-medium"
          >
            <User className="h-4 w-4" />
            <span className="hidden xl:inline">Account</span>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="p-1 text-[#173F32] hover:text-[#C9A45C] transition flex items-center gap-1 text-[12px] font-medium"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden xl:inline">Wishlist</span>
          </Link>

          {/* Cart Button */}
          <Link href="/cart">
            <button className="flex items-center gap-1.5 rounded-full bg-[#173F32] px-3.5 py-1.5 text-[12px] font-semibold text-[#FCFAF5] transition hover:bg-[#0D2F25]">
              <ShoppingBag className="h-4 w-4 text-[#C9A45C]" />
              <span className="hidden sm:inline">Cart</span>
              <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C9A45C] px-1 text-[10px] font-bold text-[#0D2F25]">
                {totalItemsCount}
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-200 bg-[#FCFAF5] px-6 py-5 lg:hidden animate-in fade-in duration-200 shadow-md">
          <nav className="flex flex-col gap-3.5 text-sm font-medium text-[#173F32]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#C9A45C] transition py-0.5"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-[#173F32]">
                Cart ({totalItemsCount} items)
              </Link>
              <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="hover:underline">
                Wishlist
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}


