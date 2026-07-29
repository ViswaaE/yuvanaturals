"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { products } from "@/constants/products";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = products.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  });

  return (
    <PageShell>
      <main className="space-y-10 pb-16">
        <section className="rounded-[2.5rem] border border-[#2f2a25]/10 bg-[#fffdf9] p-8 shadow-[0_30px_90px_rgba(47,42,37,0.08)] sm:p-10 lg:p-14">
          <SectionHeading
            eyebrow="Search Apothecary"
            title="Find your next Yuva Naturals ritual."
            description="Search our full catalog by product name, botanical herb, or skincare concern."
          />

          <div className="mt-8 relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9d6d4f]" />
            <input
              type="text"
              placeholder="Search Goat Milk, Charcoal, Neem, Manjishtha, Serum..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-[#2f2a25]/20 bg-[#f7efe6] py-4 pl-14 pr-6 text-base text-[#2f2a25] placeholder:text-[#9d6d4f]/60 outline-none focus:border-[#9d6d4f] focus:ring-2 focus:ring-[#9d6d4f]/20 transition"
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-xs text-[#6e6258] self-center mr-2 font-semibold">Popular Searches:</span>
            {["Goat Milk", "Charcoal", "Neem", "Veppalai", "Kuppaimeni", "Flora Serum", "Nalugumavu"].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="rounded-full border border-[#2f2a25]/10 bg-[#f7efe6] px-3.5 py-1 text-xs font-semibold text-[#2f2a25] hover:bg-[#2f2a25] hover:text-[#f7efe6] transition"
              >
                {term}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#6e6258]">
            Showing <span className="font-bold text-[#2f2a25]">{results.length}</span> Yuva Naturals Products
          </p>

          {results.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-[#2f2a25]/10 bg-[#fffdf9] p-12 text-center">
              <p className="text-lg font-bold text-[#2f2a25]">No matching products found</p>
              <p className="mt-2 text-sm text-[#6e6258]">Try searching for ingredients like Goat Milk, Charcoal, Aloe, or Neem.</p>
            </div>
          )}
        </section>
      </main>
    </PageShell>
  );
}
