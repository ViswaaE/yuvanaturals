import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Star } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { products } from "@/constants/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesome Millet & Grain Cookies | YUVA Naturals",
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
      <main className="space-y-16 pb-20 pt-8">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden bg-[#F7F2E8] border border-[#173F32]/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
              TRADITIONAL SNACKING &bull; HERITAGE GRAINS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#173F32]">
              Wholesome Cookies, Rooted in Tradition.
            </h1>
            <p className="text-sm sm:text-base text-[#20251F]/80 leading-relaxed max-w-2xl mx-auto">
              Traditional grains, simple ingredients and comforting flavours crafted for everyday snacking.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="grid gap-6 sm:grid-cols-3">
          {COOKIE_BENEFITS.map((item) => (
            <div
              key={item.title}
              className="bg-[#FCFAF5] border border-[#173F32]/10 p-6 rounded-2xl space-y-2 text-center sm:text-left"
            >
              <h3 className="text-base font-serif font-semibold text-[#173F32]">{item.title}</h3>
              <p className="text-xs text-[#6E716A] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Product Collection Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#173F32]/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A45C]">OUR COLLECTION</span>
              <h2 className="text-2xl font-serif font-semibold text-[#173F32]">Handcrafted Millet Cookies</h2>
            </div>
            <span className="text-xs text-[#6E716A]">{cookieProducts.length} Products</span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cookieProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Editorial Story Spotlight */}
        <section className="bg-[#0D2F25] text-[#FCFAF5] rounded-3xl p-8 sm:p-12 lg:p-14 overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A45C] font-bold">
                THE GRAIN PHILOSOPHY
              </span>
              <h2 className="text-3xl font-serif font-semibold">
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

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#FCFAF5]/15">
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
