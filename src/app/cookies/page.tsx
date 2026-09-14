import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { products } from "@/constants/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesome Millet & Grain Cookies | YUVA NATURALS",
  description: "Discover traditional millet cookies made with Solam, Thinai, Ragi, Rambu and Kavuni black rice. Rich in fibre and crafted with jaggery for everyday snacking.",
};

export default function CookiesPage() {
  const cookieProducts = products.filter((p) => p.category === "Cookies");

  const COOKIE_BENEFITS = [
    {
      title: "Traditional Grains",
      desc: "Made with authentic Indian millets including Sorghum, Foxtail, Finger Millet, Pearl Millet & Kavuni Black Rice.",
    },
    {
      title: "Naturally Rich in Fibre",
      desc: "Unrefined whole grains retain maximum dietary fibre and minerals for slow-release everyday energy.",
    },
    {
      title: "No Artificial Preservatives",
      desc: "Handcrafted in small batches with pure cow ghee and organic jaggery. Zero artificial chemicals or hydrogenated fats.",
    },
  ];

  return (
    <PageShell>
      <main className="space-y-12 pb-16 pt-4">
        {/* Banner */}
        <section className="bg-[#F7F2E8] border border-stone-200 rounded-2xl p-8 sm:p-10 text-center space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9A45C]">
            TRADITIONAL SNACKING &bull; HERITAGE GRAINS
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#173F32]">
            Wholesome Cookies, Rooted in Tradition
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto leading-relaxed">
            Traditional grains, simple ingredients and comforting flavours crafted for everyday snacking. 300g packs made with organic jaggery and pure cow ghee.
          </p>
        </section>

        {/* Benefits Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {COOKIE_BENEFITS.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-stone-200 p-5 rounded-xl space-y-1.5"
            >
              <h3 className="text-sm font-bold font-serif text-[#173F32]">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Cookie Product Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h2 className="text-xl font-bold font-serif text-[#173F32]">Handcrafted Millet Cookies</h2>
            <span className="text-xs text-stone-500">{cookieProducts.length} Products</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cookieProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Heritage Story */}
        <section className="bg-[#0D2F25] text-[#FCFAF5] rounded-2xl p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                THE GRAIN PHILOSOPHY
              </span>
              <h2 className="text-2xl font-serif font-bold">
                Nourishment Inspired by Ancient Indian Agriculture
              </h2>
              <p className="text-xs sm:text-sm text-[#FCFAF5]/80 leading-relaxed">
                Before modern wheat dominated teatime, Indian households relied on climate-resilient, nutrient-dense millets like Sorghum, Thinai, Ragi, and Kavuni black rice. Each recipe balances warm cardamom and unrefined jaggery to offer a comforting, guilt-free snack.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-[#C9A45C]">
                  <CheckCircle2 className="h-4 w-4" /> 100% Whole Grains
                </span>
                <span className="flex items-center gap-1.5 text-[#C9A45C]">
                  <CheckCircle2 className="h-4 w-4" /> Unrefined Jaggery
                </span>
                <span className="flex items-center gap-1.5 text-[#C9A45C]">
                  <CheckCircle2 className="h-4 w-4" /> Pure Cow Ghee
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
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

