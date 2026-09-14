import type { Metadata } from "next";
import { products } from "@/constants/products";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { Leaf, Droplets, FlaskConical, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Handcrafted Bath Bars — YUVA NATURALS | Ayurvedic Cold-Process Soaps",
  description:
    "Explore our collection of luxurious handcrafted Ayurvedic bath bars. Formulated with cold-pressed botanical oils, pure goat milk, and traditional Indian herbs. 125g / 4.4 oz. Free shipping over ₹500.",
};

const bathBars = products.filter((p) => p.category === "Bath Bars");

const VALUES = [
  {
    icon: Leaf,
    title: "Cold-Process Crafted",
    desc: "Each bar is handmade using the traditional cold-process method, preserving all natural glycerin and botanical nutrients.",
  },
  {
    icon: Droplets,
    title: "Zero Synthetic Chemicals",
    desc: "Free from SLS, parabens, synthetic fragrance, artificial colours, and petrochemicals.",
  },
  {
    icon: FlaskConical,
    title: "Cured for 6 Weeks",
    desc: "Bars undergo a 6-week cure to develop a mild, long-lasting, skin-safe saponification.",
  },
  {
    icon: Award,
    title: "Authentically Ayurvedic",
    desc: "Formulated using classical Ayurvedic herb combinations verified by traditional Indian botanical texts.",
  },
];

export default function BathBarsPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="bg-[#1A3C2F] text-[#FAF7F2] px-4 sm:px-8 py-16 sm:py-20 text-center relative overflow-hidden">
        {/* Decorative grain overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block border border-[#C5A059]/50 px-4 py-1 text-[10px] font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-5">
            Handcrafted Collection
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF7F2] leading-tight mb-4">
            Ayurvedic Bath Bars
          </h1>
          <p className="text-sm text-[#FAF7F2]/70 max-w-lg mx-auto leading-relaxed">
            Traditional cold-process botanical soaps handcrafted in small batches with pure goat milk, heritage herbs, and cold-pressed oils. Each bar carries the YUVA NATURALS embossed seal.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-[11px] text-[#FAF7F2]/60 font-medium uppercase tracking-wider">
            <span>125g / 4.4 oz</span>
            <span className="text-[#C5A059]">•</span>
            <span>6-Week Cure</span>
            <span className="text-[#C5A059]">•</span>
            <span>No SLS / Parabens</span>
            <span className="text-[#C5A059]">•</span>
            <span>{bathBars.length} Varieties</span>
          </div>
        </div>
      </section>

      {/* Brand Values Strip */}
      <section className="border-b border-[#E5DFD5] bg-[#F3EDE4] px-4 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-start gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center bg-[#1A3C2F]">
                <Icon className="h-4.5 w-4.5 text-[#C5A059]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#1A3C2F]">{title}</p>
                <p className="mt-0.5 text-[11px] text-[#556B61] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#E5DFD5]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
              YUVA NATURALS · BATH BARS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F] mt-1">
              The Full Collection
            </h2>
          </div>
          <p className="text-xs text-[#556B61]">
            {bathBars.length} handcrafted varieties · Each embossed with the YUVA NATURALS seal
          </p>
        </div>

        {/* 3-column Desktop, 2-column Tablet, 1-column Mobile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {bathBars.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showRating={true}
              imageAspect="portrait"
            />
          ))}
        </div>

        {/* Editorial Bottom Section */}
        <div className="mt-16 border-t border-[#E5DFD5] pt-12 grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">Our Craft</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F] leading-tight">
              Why Cold-Process Matters
            </h3>
            <p className="text-sm text-[#556B61] leading-relaxed">
              Unlike commercial soap manufacturing which uses heat to speed up saponification — destroying most of the beneficial glycerin, vitamins, and botanical nutrients — our cold-process method preserves everything. Each batch is mixed at low temperatures, poured into wooden moulds, and allowed to cure naturally for six weeks. The result is a bar that genuinely nourishes your skin rather than stripping it.
            </p>
            <p className="text-sm text-[#556B61] leading-relaxed">
              Every YUVA NATURALS bath bar is embossed by hand with our brand seal during the unmoulding process, when the soap is firm enough to hold the impression but still soft enough to accept the detail.
            </p>
          </div>
          <div className="bg-[#F3EDE4] border border-[#E5DFD5] p-8 space-y-4">
            <h4 className="font-serif font-bold text-[#1A3C2F] text-lg">What Sets Our Bars Apart</h4>
            <ul className="space-y-3 text-xs text-[#556B61]">
              {[
                "Pure saponified oils — no synthetic detergents",
                "All natural glycerin retained from saponification",
                "Traditional Indian botanical herbs and extracts",
                "No artificial colours — colour comes from the ingredients",
                "No synthetic fragrance — only pure essential oils",
                "Cold-process cured: 6 weeks minimum",
                "125g / 4.4 oz — substantial bar, lasts 4–6 weeks",
                "YUVA NATURALS logo hand-stamped into each bar",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#C5A059] mt-1.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
