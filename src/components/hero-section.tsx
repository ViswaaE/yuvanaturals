import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F3EDE4] border border-[#E5DFD5] p-6 sm:p-10 lg:p-14">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Text & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 border-b border-[#C5A059]/40 pb-1">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A059]">
              YUVA NATURALS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1A3C2F] leading-[1.08] tracking-tight">
            Nature&apos;s Touch.<br />
            <span className="italic font-serif font-normal text-[#C5A059]">Radiant Glow.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#3E564A] leading-relaxed max-w-lg">
            Handcrafted bath bars, botanical shampoos and natural skincare made with thoughtfully selected ingredients.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#1A3C2F] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FAF7F2] transition hover:bg-[#122B22] shadow-sm"
            >
              SHOP COLLECTION <ArrowRight className="h-3.5 w-3.5 text-[#C5A059]" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-[#1A3C2F]/30 bg-white/80 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A3C2F] transition hover:bg-white"
            >
              DISCOVER OUR STORY
            </Link>
          </div>

          {/* Key Promise Badges */}
          <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#E5DFD5]/80 text-[10px] uppercase font-semibold text-[#1A3C2F] tracking-wider">
            <div>&bull; Cold-Processed</div>
            <div>&bull; Fresh Goat Milk</div>
            <div>&bull; 100% Botanical</div>
          </div>
        </div>

        {/* Right Column: Hero Image of Handcrafted YUVA Soap (5 cols) */}
        <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden bg-[#FAF7F2] border border-[#E5DFD5] shadow-md">
          <Image
            src="/api/images/hero_goat_milk_lavender"
            alt="Handcrafted YUVA NATURALS Pure Goat Milk Soap Bar with Embossed Logo"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover transition-transform duration-700 hover:scale-103"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs border border-[#E5DFD5] p-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A3C2F]">
              Handcrafted Goat Milk &amp; Botanical Oil Soap
            </p>
            <p className="text-[9px] text-[#7C907C] italic font-serif mt-0.5">
              Featuring embossed YUVA NATURALS brand seal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



