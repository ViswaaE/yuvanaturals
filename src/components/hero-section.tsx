import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YuvaLogo } from "./yuva-logo";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-6 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
      {/* Decorative Botanical Accents */}
      <div className="pointer-events-none absolute -left-6 top-10 h-32 w-32 animate-float opacity-80 z-10">
        <svg viewBox="0 0 100 100" className="h-full w-full fill-[#7A9474]">
          <path d="M50 10 Q60 30 50 50 Q40 70 50 90 M45 20 Q30 15 40 30 M55 35 Q70 30 60 45 M45 50 Q30 45 40 60 M55 65 Q70 60 60 75" stroke="#2E5E4E" strokeWidth="3" fill="none" />
          <circle cx="35" cy="18" r="4" fill="#C9A66B" />
          <circle cx="65" cy="32" r="4" fill="#7A9474" />
          <circle cx="35" cy="48" r="4" fill="#C9A66B" />
        </svg>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left z-20">
          <div className="mb-4">
            <YuvaLogo variant="hero" showTagline={true} />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-[#2E5E4E]/15 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A66B] backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" /> 100% Organic & Handcrafted
          </span>

          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-[#2E5E4E] sm:text-5xl lg:text-6xl font-serif">
            Nature&apos;s Touch,<br className="hidden sm:inline" /> Radiant Glow.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#1F332B]/80 sm:text-lg">
            Discover artisanal pure goat milk bath bars, botanical hair shampoos, and antioxidant skin gels formulated with pure ingredients and traditional Ayurvedic herbal wisdom.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/shop">
              <Button className="gap-2 px-8 py-6 text-xs font-bold uppercase tracking-widest bg-[#2E5E4E] text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] rounded-full shadow-lg transition duration-300">
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="px-7 py-6 text-xs font-bold uppercase tracking-widest border-[#2E5E4E]/20 text-[#2E5E4E] hover:bg-white rounded-full">
                Our Herbal Story
              </Button>
            </Link>
          </div>

          {/* Ratings */}
          <div className="mt-10 flex items-center gap-4 border-t border-[#2E5E4E]/10 pt-6">
            <div className="flex items-center gap-1 text-[#C9A66B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-xs font-semibold text-[#1F332B]/80">
              <span className="font-bold text-[#2E5E4E]">4.9 / 5.0</span> (1,500+ Verified Clean Beauty Reviews)
            </p>
          </div>
        </div>

        {/* Hero Visual Container */}
        <div className="relative overflow-hidden rounded-[2.25rem] bg-white p-4 shadow-xl border border-[#C9A66B]/20">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-[#FAF8F3]">
            <Image
              src="/api/images/goat_milk_lavender_bar"
              alt="Yuva Naturals Goat Milk & Lavender Bath Bar"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Overlaid Floating Product Card */}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 backdrop-blur-md border border-white/50 shadow-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A66B]">Signature Pure Goat Milk</span>
                <p className="text-xs font-bold text-[#2E5E4E]">Pure Goat Milk & Lavender Bath Bar</p>
              </div>
              <Link
                href="/shop?slug=premium-pure-goat-milk-lavender-bath-bar"
                className="rounded-full bg-[#2E5E4E] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition"
              >
                View — ₹180
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
