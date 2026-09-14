"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/constants/products";
import type { ProductCategory } from "@/types/product";
import { Search, Sparkles, Filter } from "lucide-react";

const CATEGORIES_LIST = [
  "All",
  "Bath Bars",
  "Herbal Soaps",
  "Premium Shampoos",
  "Organic Skincare",
  "Lip Care",
  "Cookies",
  "Best Sellers",
  "New Arrivals",
  "Gift Collections",
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || searchParams.get("collection") || "All";
  const initialQuery = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");

  useEffect(() => {
    const cat = searchParams.get("category") || searchParams.get("collection");
    if (cat) {
      setActiveCategory(cat);
    }
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All"
        ? true
        : product.category === activeCategory || product.collections.includes(activeCategory as ProductCategory);

    const matchesPrice = product.price <= maxPrice;

    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="space-y-8 pb-16 pt-4">
      {/* Header Banner */}
      <section className="rounded-2xl border border-stone-200 bg-[#F7F2E8] p-6 sm:p-8 text-center space-y-3">
        <span className="text-[11px] font-semibold text-[#C9A45C] uppercase tracking-wider">
          BOTANICAL CARE &bull; HANDCRAFTED IN INDIA
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#173F32] font-serif">
          Shop Our Natural Collection
        </h1>
        <p className="max-w-lg mx-auto text-xs sm:text-sm text-stone-700 leading-relaxed">
          Pure goat milk bath bars, botanical shampoos, nourishing skincare, and wholesome millet cookies.
        </p>

        {/* Category Filter Pills */}
        <div className="pt-3 flex flex-wrap justify-center gap-2">
          {CATEGORIES_LIST.map((catName) => (
            <button
              key={catName}
              onClick={() => setActiveCategory(catName)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                activeCategory === catName
                  ? "bg-[#173F32] text-[#FCFAF5]"
                  : "border border-stone-300 bg-white text-[#173F32] hover:bg-[#173F32] hover:text-[#FCFAF5]"
              }`}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div className="pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-stone-300/60 mt-4">
          <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A45C]" />
            <input
              type="text"
              placeholder="Search products or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-stone-300 bg-white py-2 pl-10 pr-3 text-xs text-[#173F32] placeholder:text-stone-400 outline-none focus:border-[#173F32]"
            />
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap text-xs">
            <div className="flex items-center gap-2 text-stone-700 font-medium">
              <Filter className="h-3.5 w-3.5 text-[#C9A45C]" /> Max Price: ₹{maxPrice}
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-[#173F32] cursor-pointer"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-[#173F32] outline-none cursor-pointer"
            >
              <option value="featured">Sort by Featured</option>
              <option value="rating">Sort by Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Results */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#173F32]">
          <span>Showing {sortedProducts.length} Products</span>
          {activeCategory !== "All" && (
            <span className="text-[#C9A45C]">Category: {activeCategory}</span>
          )}
        </div>

        {sortedProducts.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-white p-10 text-center text-[#173F32]">
            <p className="text-base font-bold font-serif">No products found matching your filter criteria.</p>
            <p className="mt-1 text-xs text-stone-500">Try adjusting your search query, price slider, or category selection.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setMaxPrice(500);
              }}
              className="mt-4 rounded-md bg-[#173F32] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FCFAF5] hover:bg-[#0D2F25] transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );

}

export default function ShopPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="p-12 text-center text-xs font-bold text-[#2E5E4E]">Loading Shop...</div>}>
        <ShopContent />
      </Suspense>
    </PageShell>
  );
}
