import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F2E8] border border-stone-200/80 rounded-2xl p-6 sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Text content (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-4 text-left">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
            HANDCRAFTED BOTANICAL CARE
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#173F32] leading-tight">
            Natural Care for Skin, Hair &amp; Everyday Wellness
          </h1>

          <p className="text-sm sm:text-base text-[#173F32]/80 leading-relaxed max-w-xl">
            Handcrafted botanical products made with carefully selected natural ingredients.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-md bg-[#173F32] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FCFAF5] transition hover:bg-[#0D2F25] shadow-xs"
            >
              SHOP NOW <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-md border border-[#173F32]/30 bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#173F32] transition hover:bg-white"
            >
              EXPLORE COLLECTIONS
            </Link>
          </div>
        </div>

        {/* Hero Banner Image (5 cols on desktop) */}
        <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
          <Image
            src="/api/images/hero_goat_milk_lavender"
            alt="YUVA Naturals Handcrafted Care"
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-103"
          />
        </div>
      </div>
    </section>
  );
}


