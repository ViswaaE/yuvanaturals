import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { AnimatedSection } from "@/components/animated-section";
import { ProductCard } from "@/components/product-card";
import { HeroSection } from "@/components/hero-section";
import { products } from "@/constants/products";

export default function Home() {
  // Filter products cleanly
  const everydayFeatured = products.slice(0, 4);
  const bathBars = products.filter((p) => p.category === "Bath Bars");
  const hairCareProducts = products.filter((p) => p.category === "Premium Shampoos");
  const skincareProducts = products.filter(
    (p) => p.category === "Organic Skincare" || p.category === "Lip Care"
  );
  const cookieProducts = products.filter((p) => p.category === "Cookies").slice(0, 3);

  // Best skincare feature product
  const heroSkincareProduct = products.find((p) => p.slug === "red-wine-mulberry-glow-gel") || skincareProducts[0];
  const supportingSkincare = skincareProducts.filter((p) => p.id !== heroSkincareProduct.id);

  // Ingredients editorial list
  const EDITORIAL_INGREDIENTS = [
    { name: "Goat Milk", desc: "Rich in lactic acid and skin-softening natural lipids." },
    { name: "Lavender", desc: "Calming essential oil for soothing stressed skin and mind." },
    { name: "Aloe Vera", desc: "Deep hydration that cools, calms and clears skin irritation." },
    { name: "Neem", desc: "Traditional Ayurvedic purifier known for antibacterial skin clarity." },
    { name: "Thulasi", desc: "Holy basil leaf extract to fortify skin against environmental stressors." },
    { name: "Kuppaimeni", desc: "Ancient South Indian botanical known for soothing acne and rashes." },
    { name: "Tea Tree", desc: "Clarifying essential oil that deeply purifies congested pores." },
    { name: "Hibiscus", desc: "Known as the shoe flower, rich in natural mucilage for hair bounce." },
    { name: "Flaxseed", desc: "Packed with plant Omega-3s that fortify hair shafts and roots." },
    { name: "Coconut Milk", desc: "Lauric acid-rich cream that deeply hydrates dry skin and hair." },
    { name: "Mulberry", desc: "Natural arbutin source that brightens dark spots and uneven tone." },
    { name: "Raspberry", desc: "Antioxidant-dense berry seed oil that cushions lips with natural tint." },
  ];

  // Testimonials
  const TESTIMONIALS = [
    {
      quote: "The Pure Goat Milk & Lavender Bath Bar completely elevated my bathing routine. My dry skin feels soothed and deeply nourished after every bath.",
      name: "Ananya Patel",
      rating: 5,
    },
    {
      quote: "Red Wine & Mulberry Glow Gel gives me an effortless dewy glow without any stickiness. It has become an essential part of my morning skincare.",
      name: "Meera Krishnan",
      rating: 5,
    },
    {
      quote: "Thinai and Kavuni cookies are so delicious! Knowing they are made with traditional grains and jaggery makes teatime guilt-free.",
      name: "Siddharth Verma",
      rating: 5,
    },
  ];

  return (
    <PageShell>
      <main className="space-y-24 pb-20 pt-4">
        {/* 1. EDITORIAL HERO SECTION */}
        <HeroSection />

        {/* 2. NEW "SHOP BY RITUAL" SECTION (Asymmetric Layout) */}
        <AnimatedSection className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
              CURATED CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#173F32]">
              Shop by Ritual
            </h2>
            <p className="text-xs sm:text-sm text-[#6E716A]">
              Simple rituals, thoughtfully crafted from nature.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-12">
            {/* Category 1: Bath & Body (~50% width feature) */}
            <Link
              href="/shop?category=Bath Bars"
              className="group relative md:col-span-6 aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-[#173F32]/10 bg-[#F7F2E8] shadow-sm flex flex-col justify-end p-6 sm:p-8"
            >
              <Image
                src="/api/images/goat_milk_lavender_bar"
                alt="Bath & Body Rituals"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2F25]/85 via-[#0D2F25]/30 to-transparent"></div>
              <div className="relative z-10 space-y-2 text-[#FCFAF5] transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                  RITUAL 01
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold">Bath & Body</h3>
                <p className="text-xs text-[#FCFAF5]/80 max-w-md">
                  Handcrafted goat milk and botanical oil bars for gentle cleansing.
                </p>
                <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C9A45C]">
                  Explore Bath Bars <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Right Column (3 Smaller Categories) */}
            <div className="md:col-span-6 grid gap-6 sm:grid-cols-2 md:grid-cols-1">
              {/* Category 2: Hair Care */}
              <Link
                href="/shop?category=Premium Shampoos"
                className="group relative aspect-[16/7] overflow-hidden rounded-2xl border border-[#173F32]/10 bg-[#F7F2E8] shadow-sm flex flex-col justify-end p-6"
              >
                <Image
                  src="/api/images/flaxseed_shampoo"
                  alt="Hair Care Rituals"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2F25]/85 via-[#0D2F25]/30 to-transparent"></div>
                <div className="relative z-10 flex items-center justify-between text-[#FCFAF5] transition-transform duration-300 group-hover:-translate-y-0.5">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">RITUAL 02</span>
                    <h3 className="text-xl font-serif font-semibold">Hair Care</h3>
                  </div>
                  <span className="text-xs font-semibold text-[#C9A45C] group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>

              {/* Category 3 & 4 Row */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Category 3: Skincare */}
                <Link
                  href="/shop?category=Organic Skincare"
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#173F32]/10 bg-[#F7F2E8] shadow-sm flex flex-col justify-end p-5"
                >
                  <Image
                    src="/api/images/red_wine_glow_gel"
                    alt="Skincare Rituals"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2F25]/85 via-[#0D2F25]/20 to-transparent"></div>
                  <div className="relative z-10 text-[#FCFAF5] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">RITUAL 03</span>
                    <h3 className="text-lg font-serif font-semibold">Skincare</h3>
                  </div>
                </Link>

                {/* Category 4: Wholesome Cookies */}
                <Link
                  href="/cookies"
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#173F32]/10 bg-[#F7F2E8] shadow-sm flex flex-col justify-end p-5"
                >
                  <Image
                    src="/api/images/thinai_cookies"
                    alt="Wholesome Cookies"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2F25]/85 via-[#0D2F25]/20 to-transparent"></div>
                  <div className="relative z-10 text-[#FCFAF5] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">RITUAL 04</span>
                    <h3 className="text-lg font-serif font-semibold">Wholesome Cookies</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 3. FEATURED COLLECTION ("Made for Everyday Rituals") */}
        <AnimatedSection className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#173F32]/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
                FEATURED SELECTION
              </span>
              <h2 className="text-3xl font-serif font-semibold text-[#173F32]">
                Made for Everyday Rituals
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#173F32] hover:text-[#C9A45C] transition"
            >
              Shop All Products &rarr;
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {everydayFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 4. THE BATH BAR COLLECTION */}
        <AnimatedSection className="bg-[#F7F2E8] border border-[#173F32]/10 rounded-3xl p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
              HANDCRAFTED CLEANSING
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#173F32]">
              The Bath Bar Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#6E716A] leading-relaxed">
              Handcrafted cleansing rituals inspired by traditional botanicals and nourishing oils.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bathBars.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 5. "THE INGREDIENTS" EDITORIAL SECTION */}
        <AnimatedSection className="space-y-10" id="ingredients">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
              BOTANICAL HARVEST
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#173F32]">
              Nature, Carefully Chosen.
            </h2>
            <p className="text-xs sm:text-sm text-[#6E716A]">
              Every formula is crafted with pure natural ingredients selected for their soothing, restorative benefits.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {EDITORIAL_INGREDIENTS.map((item) => (
              <div
                key={item.name}
                className="bg-[#FCFAF5] border border-[#173F32]/10 p-5 rounded-xl hover:border-[#C9A45C] transition duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-serif font-semibold text-[#173F32]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#6E716A] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#173F32]/5 flex items-center gap-1.5 text-[10px] font-semibold text-[#C9A45C]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#173F32]" /> Pure Botanical Extract
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 6. HAIR CARE SECTION */}
        <AnimatedSection className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#173F32]/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
                SCALP & STRAND FORTIFICATION
              </span>
              <h2 className="text-3xl font-serif font-semibold text-[#173F32]">
                Botanical Hair Rituals
              </h2>
            </div>
            <Link
              href="/shop?category=Premium Shampoos"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#173F32] hover:text-[#C9A45C] transition"
            >
              Explore Hair Care &rarr;
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {hairCareProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 7. SKINCARE SECTION (Editorial Layout) */}
        <AnimatedSection className="space-y-8">
          <div className="border-b border-[#173F32]/10 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
              RADIANT COMPLEXION
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#173F32]">
              Glow, Naturally.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            {/* Hero Skincare Feature */}
            <div className="lg:col-span-5 bg-[#0D2F25] text-[#FCFAF5] rounded-3xl p-8 flex flex-col justify-between border border-[#173F32]/20 relative overflow-hidden">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 border border-[#FCFAF5]/10">
                <Image
                  src={heroSkincareProduct.image}
                  alt={heroSkincareProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                  FEATURED SPOTLIGHT
                </span>
                <h3 className="text-2xl font-serif font-semibold">
                  {heroSkincareProduct.name}
                </h3>
                <p className="text-xs text-[#FCFAF5]/80 leading-relaxed">
                  {heroSkincareProduct.description}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-[#C9A45C]">₹{heroSkincareProduct.price}</span>
                  <Link
                    href={`/product/${heroSkincareProduct.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#C9A45C] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#0D2F25] hover:bg-[#FCFAF5] transition"
                  >
                    View Detail &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Supporting Skincare Products */}
            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {supportingSkincare.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 8. NEW COOKIE COLLECTION HOMEPAGE SECTION */}
        <AnimatedSection className="bg-[#F7F2E8] border border-[#173F32]/10 rounded-3xl p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#173F32]/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
                TRADITIONAL SNACKING
              </span>
              <h2 className="text-3xl font-serif font-semibold text-[#173F32]">
                Wholesome Cookies, Rooted in Tradition.
              </h2>
              <p className="text-xs sm:text-sm text-[#6E716A] mt-1">
                Traditional grains, simple ingredients and comforting flavours crafted for everyday snacking.
              </p>
            </div>
            <Link
              href="/cookies"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#173F32] hover:text-[#C9A45C] transition shrink-0"
            >
              Explore All Cookies &rarr;
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {cookieProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 9. "WHY YUVA NATURALS" PHILOSOPHY SECTION */}
        <AnimatedSection className="py-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
              BRAND PHILOSOPHY
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#173F32]">
              Why YUVA Naturals
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3 p-6 bg-[#FCFAF5] border border-[#173F32]/10 rounded-2xl">
              <span className="text-2xl font-serif font-bold text-[#C9A45C]">01</span>
              <h3 className="text-lg font-serif font-semibold text-[#173F32]">Handcrafted with Care</h3>
              <p className="text-xs text-[#6E716A] leading-relaxed">
                Small batch cold-process soapmaking and artisanal formulations crafted to preserve active plant nutrients.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FCFAF5] border border-[#173F32]/10 rounded-2xl">
              <span className="text-2xl font-serif font-bold text-[#C9A45C]">02</span>
              <h3 className="text-lg font-serif font-semibold text-[#173F32]">Thoughtfully Selected Ingredients</h3>
              <p className="text-xs text-[#6E716A] leading-relaxed">
                Pure farm-fresh goat milk, cold-pressed seed oils, and botanical extracts free from harsh synthetics.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FCFAF5] border border-[#173F32]/10 rounded-2xl">
              <span className="text-2xl font-serif font-bold text-[#C9A45C]">03</span>
              <h3 className="text-lg font-serif font-semibold text-[#173F32]">Inspired by Traditional Wisdom</h3>
              <p className="text-xs text-[#6E716A] leading-relaxed">
                Ayurvedic herbal roots and traditional Indian millet grains formulated for modern daily wellness.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FCFAF5] border border-[#173F32]/10 rounded-2xl">
              <span className="text-2xl font-serif font-bold text-[#C9A45C]">04</span>
              <h3 className="text-lg font-serif font-semibold text-[#173F32]">Made for Everyday Rituals</h3>
              <p className="text-xs text-[#6E716A] leading-relaxed">
                Gentle formulas crafted to elevate everyday bathing, hair care, skincare, and teatime snacking.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* 10. BRAND STORY SECTION */}
        <AnimatedSection className="bg-[#F7F2E8] border border-[#173F32]/10 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#173F32]/10 shadow-md">
              <Image
                src="/api/images/nalugumavu_bath_bar"
                alt="YUVA Naturals Heritage Crafting"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
                OUR HERITAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#173F32] leading-tight">
                Rooted in Nature.<br />
                Made for You.
              </h2>
              <p className="text-xs sm:text-sm text-[#20251F]/80 leading-relaxed">
                YUVA Naturals was born out of a deep respect for traditional Indian botanical care and wholesome living. From rich goat milk bath bars to ancient millet cookies, every single product is created with pure intention, uncompromised quality, and thoughtful craftsmanship.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-[#173F32] px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#FCFAF5] hover:bg-[#0D2F25] transition"
                >
                  DISCOVER OUR STORY &rarr;
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 11. TESTIMONIALS SECTION */}
        <AnimatedSection className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
              COMMUNITY REVIEWS
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#173F32]">
              Customer Stories
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F7F2E8] border border-[#173F32]/10 p-6 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-[#C9A45C]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#20251F]/80 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-[#173F32]/10">
                  <p className="text-xs font-serif font-semibold text-[#173F32]">{item.name}</p>
                  <p className="text-[10px] text-[#6E716A]">Verified Buyer</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 12. NEWSLETTER SECTION */}
        <AnimatedSection className="bg-[#173F32] text-[#FCFAF5] rounded-3xl p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-4 shadow-md">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A45C] font-bold">
            JOIN OUR CIRCLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold">
            Stay Close to Nature.
          </h2>
          <p className="text-xs sm:text-sm text-[#FCFAF5]/80 max-w-lg mx-auto leading-relaxed">
            Receive new collection updates, thoughtful rituals and occasional offers from YUVA NATURALS.
          </p>

          <form className="pt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="w-full bg-[#FCFAF5] px-4 py-3 rounded-full text-xs text-[#20251F] outline-none border border-transparent focus:border-[#C9A45C]"
            />
            <button
              type="submit"
              className="rounded-full bg-[#C9A45C] px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#0D2F25] hover:bg-[#FCFAF5] transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </AnimatedSection>
      </main>
    </PageShell>
  );
}
