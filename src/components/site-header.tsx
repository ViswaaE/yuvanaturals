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
    { label: "Bath Bars", href: "/bath-bars" },
    { label: "Shampoos", href: "/shop?category=Premium Shampoos" },
    { label: "Skincare", href: "/shop?category=Organic Skincare" },
    { label: "Lip Care", href: "/shop?category=Lip Care" },
    { label: "Cookies", href: "/cookies" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 border-b border-[#E5DFD5] backdrop-blur-md transition-all">
      {/* Slim Announcement Bar */}
      <div className="bg-[#1A3C2F] py-1.5 px-4 text-center text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase text-[#FAF7F2]">
        <span>FREE SHIPPING ON ORDERS ABOVE ₹5000 &bull; HANDCRAFTED BOTANICAL CARE</span>
      </div>

      {/* Main Navigation Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[56px] sm:h-[62px] flex items-center justify-between gap-4">
        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#1A3C2F] hover:text-[#C5A059] transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center flex-shrink-0">
          <YuvaLogo variant="header" priority={true} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] font-medium tracking-wide uppercase text-[#1A3C2F]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-colors hover:text-[#C5A059] py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A059] hover:after:w-full after:transition-all ${
                link.label === "Cookies" ? "font-semibold text-[#1A3C2F]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Search, Account, Wishlist, Cart */}
        <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0 justify-end">
          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-[#1A3C2F] hover:text-[#C5A059] transition flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden xl:inline">Search</span>
            </button>

            {searchOpen && (
              <form
                action="/shop"
                method="GET"
                className="absolute right-0 top-full mt-2 w-72 bg-white p-2.5 border border-[#E5DFD5] shadow-lg rounded-sm z-50"
              >
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search soaps, skincare, cookies..."
                  autoFocus
                  className="w-full bg-[#FAF7F2] px-3 py-2 text-xs text-[#1A3C2F] outline-none border border-[#E5DFD5] focus:border-[#1A3C2F] rounded-xs"
                />
              </form>
            )}
          </div>

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="p-1.5 text-[#1A3C2F] hover:text-[#C5A059] transition flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden xl:inline">Wishlist</span>
          </Link>

          {/* Account Link */}
          <Link
            href="/shop"
            aria-label="Account"
            className="p-1.5 text-[#1A3C2F] hover:text-[#C5A059] transition flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider"
          >
            <User className="h-4 w-4" />
            <span className="hidden xl:inline">Account</span>
          </Link>

          {/* Cart Counter Button */}
          <Link href="/cart">
            <button className="flex items-center gap-2 rounded-xs bg-[#1A3C2F] px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-[#FAF7F2] transition hover:bg-[#122B22]">
              <ShoppingBag className="h-3.5 w-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline uppercase">Cart</span>
              <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#C5A059] px-1 text-[10px] font-bold text-[#122B22]">
                {totalItemsCount}
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E5DFD5] bg-[#FAF7F2] px-6 py-5 lg:hidden shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3.5 text-xs font-medium uppercase tracking-wider text-[#1A3C2F]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#C5A059] transition py-1 border-b border-[#E5DFD5]/40"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs text-[#7C907C]">
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-[#1A3C2F]">
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


