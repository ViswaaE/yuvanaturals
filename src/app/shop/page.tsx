"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/constants/products";
import type { ProductCategory } from "@/types/product";
import { Search, SlidersHorizontal, Sparkles, Filter } from "lucide-react";

const FILTER_PILLS = [
  { label: "Bath Bars", value: "Bath Bars" },
  { label: "Shampoos", value: "Luxury Herbal Soaps" },
  { label: "Toners", value: "Organic Skincare" },
  { label: "Gels", value: "Natural Serums" },
  { label: "Lip Care", value: "Gift Collections" },
  { label: "All", value: "ALL" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Bath Bars");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(40);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "ALL"
        ? true
        : activeCategory === "Bath Bars"
        ? product.category === "Bath Bars"
        : product.category === activeCategory || product.collections.includes(activeCategory as any);

    const matchesPrice = product.price <= maxPrice;

    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <PageShell>
      <main className="space-y-12 pb-16">
        {/* Header Hero Banner */}
        <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2E5E4E]/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A66B]">
            <Sparkles className="h-3.5 w-3.5" /> Yuva Apothecary
          </span>
          <h1 className="mt-4 text-4xl font-bold text-[#2E5E4E] sm:text-5xl font-serif">
            Shop
          </h1>

          {/* Category Filter Pills (Bath Bars, Shampoos, Toners, Gels, Lip Care) */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {FILTER_PILLS.map((pill) => (
              <button
                key={pill.label}
                onClick={() => setActiveCategory(pill.label)}
                className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeCategory === pill.label
                    ? "bg-[#2E5E4E] text-[#FAF8F3] shadow-md"
                    : "border border-[#2E5E4E]/15 bg-white text-[#2E5E4E] hover:bg-[#2E5E4E] hover:text-[#FAF8F3]"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-[#2E5E4E]/10 pt-6">
            <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A66B]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#2E5E4E]/15 bg-white py-2.5 pl-11 pr-4 text-xs text-[#2E5E4E] placeholder:text-[#6e6258] outline-none focus:border-[#C9A66B]"
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#2E5E4E] flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5 text-[#C9A66B]" /> Max: ${maxPrice}
                </span>
                <input
                  type="range"
                  min={10}
                  max={45}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 accent-[#2E5E4E] cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#2E5E4E] flex items-center gap-1">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[#C9A66B]" /> Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-full border border-[#2E5E4E]/15 bg-white px-3 py-2 text-xs font-bold text-[#2E5E4E] outline-none focus:border-[#C9A66B]"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#6e6258] font-bold">
            Showing <span className="font-extrabold text-[#2E5E4E]">{sortedProducts.length}</span> Products
          </p>

          {sortedProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-12 text-center">
              <p className="text-lg font-bold text-[#2E5E4E]">No products found matching filters</p>
              <button
                onClick={() => {
                  setActiveCategory("ALL");
                  setSearchQuery("");
                  setMaxPrice(45);
                }}
                className="mt-4 rounded-full bg-[#2E5E4E] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#FAF8F3]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </PageShell>
  );
}
