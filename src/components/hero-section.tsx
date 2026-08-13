import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F2E8] border border-[#173F32]/10 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-sm">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col items-start text-left">
          {/* Eyebrow */}
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
            BOTANICAL CARE &bull; HANDCRAFTED IN INDIA
          </span>

          {/* Headline */}
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-[#173F32] leading-[1.15]">
            Nature&apos;s Touch,<br />
            <span className="italic font-normal text-[#0D2F25]">Radiant Glow.</span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#20251F]/80 max-w-xl">
            Discover handcrafted bath bars, botanical hair care, nourishing skincare and wholesome millet cookies, made with carefully selected ingredients.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#173F32] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#FCFAF5] transition hover:bg-[#0D2F25] shadow-sm"
            >
              SHOP COLLECTION &rarr;
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-[#173F32]/25 bg-transparent px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#173F32] transition hover:bg-[#FCFAF5]"
            >
              OUR STORY
            </Link>
          </div>

          {/* Subtle Trust Points */}
          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-[#173F32]/10 pt-6 text-xs text-[#6E716A]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]"></span>
              <span className="font-medium text-[#20251F]">Handcrafted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]"></span>
              <span className="font-medium text-[#20251F]">Botanical Ingredients</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]"></span>
              <span className="font-medium text-[#20251F]">Made with Care</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Photography */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#173F32]/10 shadow-lg bg-[#FCFAF5]">
          <Image
            src="/api/images/hero_goat_milk_lavender"
            alt="YUVA Naturals Pure Goat Milk & Lavender Bath Bar"
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2F25]/40 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-4 left-4 right-4 bg-[#FCFAF5]/90 backdrop-blur-md p-4 rounded-xl border border-[#173F32]/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#C9A45C]">FEATURED RITUAL</span>
              <p className="text-xs font-serif font-bold text-[#173F32]">Pure Goat Milk & Lavender Bath Bar</p>
            </div>
            <Link
              href="/product/premium-pure-goat-milk-lavender-bath-bar"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#173F32] hover:text-[#C9A45C] transition"
            >
              Explore &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

