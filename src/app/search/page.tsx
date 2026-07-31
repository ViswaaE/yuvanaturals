"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { products } from "@/constants/products";
import { Search, Sparkles } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setQuery(q);
    }
  }, [searchParams]);

  const results = products.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  });

  const POPULAR_TAGS = ["Goat Milk", "Manjishtha", "Charcoal", "Flaxseed", "Hibiscus", "Rose", "Red Wine", "Raspberry", "Nalugumavu"];

  return (
    <main className="space-y-10 pb-16">
      <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#2E5E4E]/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A66B]">
          <Sparkles className="h-3.5 w-3.5" /> Yuva Botanical Search
        </span>
        <SectionHeading
          eyebrow=""
          title="Find Your Yuva Naturals Ritual"
          description="Search our full catalog by product name, botanical herb, skin concern, or hair type."
        />

        <div className="mt-8 relative max-w-2xl mx-auto">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C9A66B]" />
          <input
            type="text"
            placeholder="Search Goat Milk, Lavender, Manjishtha, Charcoal, Flaxseed, Rose..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-[#2E5E4E]/20 bg-white py-4 pl-14 pr-6 text-sm text-[#2E5E4E] placeholder:text-[#6e6258] outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition"
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="text-xs text-[#6e6258] self-center mr-2 font-semibold">Popular Searches:</span>
          {POPULAR_TAGS.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className={`rounded-full border px-4 py-1 text-xs font-bold transition ${
                query.toLowerCase() === term.toLowerCase()
                  ? "bg-[#2E5E4E] text-[#FAF8F3] border-[#2E5E4E]"
                  : "border-[#2E5E4E]/15 bg-white text-[#2E5E4E] hover:bg-[#2E5E4E] hover:text-[#FAF8F3]"
              }`}
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <p className="text-xs uppercase tracking-widest text-[#2E5E4E]">
          Showing <span className="font-bold">{results.length}</span> Yuva Naturals Products
        </p>

        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[#2E5E4E]/10 bg-white p-12 text-center">
            <p className="text-lg font-bold font-serif text-[#2E5E4E]">No matching products found</p>
            <p className="mt-2 text-xs text-[#6e6258]">Try searching for ingredients like Goat Milk, Lavender, Flaxseed, or Mulberry.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="p-12 text-center text-xs font-bold text-[#2E5E4E]">Loading Search...</div>}>
        <SearchContent />
      </Suspense>
    </PageShell>
  );
}
