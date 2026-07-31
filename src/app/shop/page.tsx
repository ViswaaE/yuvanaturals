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
    <main className="space-y-12 pb-16">
      {/* Header Hero Banner */}
      <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#2E5E4E]/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A66B]">
          <Sparkles className="h-3.5 w-3.5" /> Yuva Botanical Apothecary
        </span>
        <h1 className="mt-4 text-4xl font-bold text-[#2E5E4E] sm:text-5xl font-serif">
          Shop Our Official Collection
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-xs sm:text-sm text-[#1F332B]/80 leading-relaxed">
          Artisanal pure goat milk bath bars, herbal soaps, root-strengthening shampoos, and natural organic skincare.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {CATEGORIES_LIST.map((catName) => (
            <button
              key={catName}
              onClick={() => setActiveCategory(catName)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                activeCategory === catName
                  ? "bg-[#2E5E4E] text-[#FAF8F3] shadow-md"
                  : "border border-[#2E5E4E]/15 bg-white text-[#2E5E4E] hover:bg-[#2E5E4E] hover:text-[#FAF8F3]"
              }`}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-[#2E5E4E]/10 pt-6">
          <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A66B]" />
            <input
              type="text"
              placeholder="Search products or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#2E5E4E]/15 bg-white py-2.5 pl-11 pr-4 text-xs text-[#2E5E4E] placeholder:text-[#6e6258] outline-none focus:border-[#C9A66B]"
            />
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2E5E4E] flex items-center gap-1">
                <Filter className="h-3.5 w-3.5 text-[#C9A66B]" /> Max Price: ₹{maxPrice}
              </span>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-[#2E5E4E] cursor-pointer"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-full border border-[#2E5E4E]/15 bg-white px-4 py-2 text-xs font-bold text-[#2E5E4E] outline-none cursor-pointer"
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
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#2E5E4E]">
          <span>Showing {sortedProducts.length} Products</span>
          {activeCategory !== "All" && (
            <span className="text-[#C9A66B]">Category: {activeCategory}</span>
          )}
        </div>

        {sortedProducts.length === 0 ? (
          <div className="rounded-[2rem] border border-[#2E5E4E]/10 bg-white p-12 text-center text-[#2E5E4E]">
            <p className="text-lg font-bold font-serif">No products found matching your filter criteria.</p>
            <p className="mt-2 text-xs text-[#6e6258]">Try adjusting your search query, price slider, or category selection.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setMaxPrice(50);
              }}
              className="mt-6 rounded-full bg-[#2E5E4E] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
