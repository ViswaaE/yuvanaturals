"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { products } from "@/constants/products";
import type { ProductCategory } from "@/types/product";
import { Search, Sparkles, Filter, SlidersHorizontal, RotateCcw } from "lucide-react";

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
    <main className="space-y-8 pb-20 pt-4">
      {/* Header Banner */}
      <section className="bg-[#F3EDE4] border border-[#E5DFD5] p-6 sm:p-10 text-center space-y-3">
        <span className="text-[10px] font-semibold text-[#C5A059] uppercase tracking-[0.22em]">
          BOTANICAL CARE &bull; HANDCRAFTED IN INDIA
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A3C2F] font-serif">
          Shop Our Natural Collection
        </h1>
        <p className="max-w-lg mx-auto text-xs sm:text-sm text-[#556B61] leading-relaxed">
          Pure goat milk bath bars, botanical shampoos, nourishing skincare, and wholesome millet cookies. All prices in Indian Rupees (₹).
        </p>

        {/* Category Filter Pills */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {CATEGORIES_LIST.map((catName) => (
            <button
              key={catName}
              onClick={() => setActiveCategory(catName)}
              className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${
                activeCategory === catName
                  ? "bg-[#1A3C2F] text-[#FAF7F2]"
                  : "border border-[#E5DFD5] bg-white text-[#1A3C2F] hover:border-[#1A3C2F]"
              }`}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[#E5DFD5] mt-4">
          <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C5A059]" />
            <input
              type="text"
              placeholder="Search products or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#E5DFD5] bg-white py-2 pl-10 pr-3 text-xs text-[#1A3C2F] placeholder:text-[#7C907C] outline-none focus:border-[#1A3C2F]"
            />
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap text-xs">
            <div className="flex items-center gap-2 text-[#1A3C2F] font-semibold">
              <Filter className="h-3.5 w-3.5 text-[#C5A059]" /> Max Price: ₹{maxPrice}
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-[#1A3C2F] cursor-pointer"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-[#E5DFD5] bg-white px-3 py-2 text-xs font-semibold text-[#1A3C2F] outline-none cursor-pointer"
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
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">
          <span>Showing {sortedProducts.length} Products</span>
          {activeCategory !== "All" && (
            <span className="text-[#C5A059]">Category: {activeCategory}</span>
          )}
        </div>

        {sortedProducts.length === 0 ? (
          <div className="border border-[#E5DFD5] bg-white p-12 text-center text-[#1A3C2F] space-y-3">
            <p className="text-base font-bold font-serif">No products found matching your search filter.</p>
            <p className="text-xs text-[#7C907C]">Try clearing search keywords or adjusting the price slider.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setMaxPrice(500);
              }}
              className="inline-flex items-center gap-2 bg-[#1A3C2F] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#122B22] transition"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} imageAspect="portrait" />
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
      <Suspense fallback={<div className="p-12 text-center text-xs font-bold text-[#1A3C2F]">Loading Botanical Catalog...</div>}>
        <ShopContent />
      </Suspense>
    </PageShell>
  );
}

