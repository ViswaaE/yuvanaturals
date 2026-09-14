import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Wheat, Cookie, ShieldCheck, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { products } from "@/constants/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesome Millet & Traditional Grain Cookies | YUVA NATURALS",
  description: "Traditional Indian millet cookies baked with Solam, Thinai, Ragi, Kambu (Pearl Millet) and Karuppu Kavuni Black Rice. Rich in fiber, made with organic jaggery and pure cow ghee.",
};

export default function CookiesPage() {
  const cookieProducts = products.filter((p) => p.category === "Cookies");

  const GRAIN_HIGHLIGHTS = [
    {
      title: "Solam (Sorghum)",
      subtitle: "Jowar Grain Base",
      desc: "Rich in fiber and minerals for sustained everyday energy.",
    },
    {
      title: "Thinai (Foxtail Millet)",
      subtitle: "Light & Easy-to-Digest",
      desc: "Ancient light grain prized for its delicate crunch and digestibility.",
    },
    {
      title: "Ragi (Finger Millet)",
      subtitle: "Natural Calcium Boost",
      desc: "Finger millet nutrient density packed with natural calcium and fiber.",
    },
    {
      title: "Kambu (Pearl Millet)",
      subtitle: "Jaggery Sweetened",
      desc: "Traditional pearl millet baked with pure unrefined jaggery, zero white sugar.",
    },
    {
      title: "Karuppu Kavuni",
      subtitle: "Heritage Black Rice",
      desc: "Rare black rice variety famous for natural antioxidants and rich nutty flavor.",
    },
  ];

  return (
    <PageShell>
      <main className="space-y-14 pb-20 pt-4">
        {/* Banner with Warm Bakery & Grain Styling */}
        <section className="relative overflow-hidden bg-[#F3ECE0] border border-[#D9C3B0] p-8 sm:p-12 lg:p-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 border-b border-[#A68340]/40 pb-1">
            <Wheat className="h-4 w-4 text-[#A68340]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#A68340]">
              TRADITIONAL GRAINS &bull; BAKED WITH JAGGERY &amp; GHEE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#3B291A] leading-tight">
            Wholesome Millet Cookies,<br />
            <span className="italic text-[#A68340]">Rooted in Tradition.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#5C4533] max-w-2xl mx-auto leading-relaxed">
            Crafted with traditional Indian millets and ancient black rice. 300g generous packs baked with pure cow ghee and natural jaggery — zero refined sugar, zero palm oil, zero artificial preservatives.
          </p>

          <div className="pt-2 flex justify-center gap-3 text-[10px] font-bold uppercase tracking-wider text-[#3B291A]">
            <span className="bg-white/80 px-3 py-1 border border-[#D9C3B0]">&bull; 300g Value Pack</span>
            <span className="bg-white/80 px-3 py-1 border border-[#D9C3B0]">&bull; 100% Whole Grains</span>
            <span className="bg-white/80 px-3 py-1 border border-[#D9C3B0]">&bull; Organic Jaggery</span>
          </div>
        </section>

        {/* Grain Variety Highlights Bar */}
        <section className="space-y-4">
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A68340]">OUR HERITAGE GRAINS</span>
            <h2 className="text-2xl font-serif font-bold text-[#3B291A]">5 Wholesome Varieties</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {GRAIN_HIGHLIGHTS.map((g) => (
              <div key={g.title} className="bg-white border border-[#E5DFD5] p-4 text-center space-y-1 hover:border-[#A68340] transition">
                <span className="text-[9px] font-bold uppercase text-[#A68340] tracking-wider">{g.subtitle}</span>
                <h3 className="text-xs font-bold text-[#3B291A] font-serif">{g.title}</h3>
                <p className="text-[11px] text-[#6E5A4B] leading-snug">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cookie Product Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#D9C3B0] pb-3 gap-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A68340]">EVERYDAY HEALTHY SNACKING</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3B291A]">Handcrafted Cookie Collection</h2>
            </div>
            <span className="text-xs font-semibold text-[#6E5A4B]">5 Artisanal Products</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cookieProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Traditional Grain Heritage Feature Banner */}
        <section className="bg-[#2D3A2E] text-[#FAF7F2] border border-[#2D3A2E] p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                THE GRAIN PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
                Nourishment Inspired by Ancient Indian Agriculture
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                Long before modern processed wheat dominated teatime, Indian households relied on nutrient-rich, climate-resilient grains like Sorghum, Thinai, Ragi, Pearl Millet, and Kavuni black rice. Each batch balances warm cardamom and unrefined jaggery to offer a comforting, guilt-free snack.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-[#C5A059]">
                  <CheckCircle2 className="h-4 w-4" /> 100% Whole Millet &amp; Grain Flours
                </span>
                <span className="flex items-center gap-1.5 text-[#C5A059]">
                  <CheckCircle2 className="h-4 w-4" /> Sweetened with Organic Jaggery
                </span>
                <span className="flex items-center gap-1.5 text-[#C5A059]">
                  <CheckCircle2 className="h-4 w-4" /> Pure Cow Ghee Baking
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden border border-white/10 shadow-lg">
              <Image
                src="/api/images/kavuni_cookies"
                alt="Heritage Black Rice Kavuni Cookies"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}


