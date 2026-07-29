"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X, Sparkles } from "lucide-react";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2E5E4E]/10 bg-[#FAF8F3]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Nav Links */}
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-widest text-[#2E5E4E] lg:flex">
          <Link href="/shop" className="transition hover:text-[#C9A66B]">Shop</Link>
          <Link href="/about" className="transition hover:text-[#C9A66B]">About</Link>
          <Link href="/contact" className="transition hover:text-[#C9A66B]">Contact</Link>
          <Link href="/faq" className="transition hover:text-[#C9A66B]">Account</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-full p-2 text-[#2E5E4E] lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Center Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2E5E4E] text-[#FAF8F3] shadow-sm transition group-hover:bg-[#C9A66B]">
            <Sparkles className="h-4 w-4 text-[#C9A66B] group-hover:text-[#2E5E4E] transition" />
          </div>
          <span className="text-xl font-bold tracking-[0.18em] font-serif text-[#2E5E4E] transition group-hover:text-[#C9A66B]">
            YUVA NATURALS
          </span>
        </Link>

        {/* Right Search & Utility Icons */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block w-48">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9d6d4f]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-full border border-[#2E5E4E]/15 bg-[#F6F1E9] py-1.5 pl-8 pr-3 text-xs text-[#2E5E4E] placeholder:text-[#6e6258] outline-none focus:border-[#C9A66B]"
            />
          </div>

          <Link href="/wishlist" aria-label="Wishlist" className="relative p-2 text-[#2E5E4E] hover:text-[#C9A66B] transition">
            <Heart className="h-4 w-4" />
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2E5E4E] text-[9px] font-bold text-white">
              3
            </span>
          </Link>

          <Link href="/cart">
            <button className="flex items-center gap-1.5 rounded-full bg-[#2E5E4E] px-3.5 py-1.5 text-xs font-bold text-[#FAF8F3] shadow-sm transition hover:bg-[#C9A66B] hover:text-[#2E5E4E]">
              <ShoppingBag className="h-3.5 w-3.5 text-[#C9A66B]" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Cart</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">2</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#2E5E4E]/10 bg-[#FAF8F3] px-6 py-4 lg:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3 text-xs font-bold uppercase tracking-widest text-[#2E5E4E]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop Collection</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Brand</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ & Account</Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>Shopping Cart</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
