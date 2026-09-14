import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, HeartHandshake, Leaf, Sparkles, ShieldCheck, CheckCircle2, MessageSquare, Quote } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { HeroSection } from "@/components/hero-section";
import { CategoryCard, type CategoryCardData } from "@/components/category-card";
import { products } from "@/constants/products";

export default function Home() {
  // Editorial Category sections
  const CATEGORIES: CategoryCardData[] = [
    {
      title: "Bath Bars",
      description: "Handcrafted pure goat milk & cold-pressed oil soap bars with embossed logo.",
      image: "/api/images/goat_milk_lavender_bar",
      href: "/shop?category=Bath Bars",
    },
    {
      title: "Shampoos",
      description: "Botanical hair cleansers enriched with flaxseed, hibiscus & coconut milk.",
      image: "/api/images/hibiscus_shampoo",
      href: "/shop?category=Premium Shampoos",
    },
    {
      title: "Skincare",
      description: "Antioxidant Damask rose mists, red wine glow gels & acne face treatments.",
      image: "/api/images/rose_aura_toner",
      href: "/shop?category=Organic Skincare",
    },
    {
      title: "Lip Care",
      description: "Raw shea butter & natural raspberry fruit extracts for soft, tinted lips.",
      image: "/api/images/raspberry_lip_balm",
      href: "/shop?category=Lip Care",
    },
    {
      title: "Cookies",
      description: "300g packs of traditional millet cookies baked with jaggery & pure ghee.",
      image: "/api/images/thinai_cookies",
      href: "/cookies",
    },
  ];

  // Best Sellers
  const bestSellers = products.filter((p) => p.badge === "Best Seller" || p.collections.includes("Best Sellers")).slice(0, 4);

  // Featured Collection items
  const featuredRituals = products.slice(0, 6);

  // Bath Bars
  const bathBars = products.filter((p) => p.category === "Bath Bars");

  // Botanical ingredients philosophy data
  const INGREDIENTS_PHILOSOPHY = [
    {
      name: "Pure Fresh Goat Milk",
      benefit: "pH-Balanced Hydration",
      desc: "Rich in lactic acid and natural A & E vitamins to gently dissolve dead skin while nourishing lipids.",
      image: "/api/images/goat_milk_lavender_bar",
    },
    {
      name: "Manjistha & Licorice",
      benefit: "Ayurvedic Glow & Complexion",
      desc: "Traditional Indian madder root synergy that visibly brightens uneven pigmentation.",
      image: "/api/images/manjishtha_bath_bar",
    },
    {
      name: "Red Wine Resveratrol",
      benefit: "Potent Antioxidant Renewal",
      desc: "Protects cellular matrix from oxidative stress and improves youthful skin firmness.",
      image: "/api/images/red_wine_glow_gel",
    },
    {
      name: "Neem, Tulsi & Kuppaimeni",
      benefit: "Blemish & Acne Clarifying",
      desc: "Time-tested antibacterial leaf elixirs that soothe reactive skin and clear congested pores.",
      image: "/api/images/aloe_neem_tulsi_bar",
    },
  ];

  // Verified Testimonials
  const TESTIMONIALS = [
    {
      author: "Aaradhya S.",
      city: "Bengaluru",
      rating: 5,
      review: "The Goat Milk Lavender soap is unmatched! You can see the handmade texture and the embossed logo. My skin has never felt softer after a shower.",
      product: "Pure Goat Milk Lavender Soap",
    },
    {
      author: "Kavya Menon",
      city: "Kochi",
      rating: 5,
      review: "The Nalugumavu bath bar and Red Wine Glow Gel are staples in my morning routine now. Authentic South Indian botanical aromas!",
      product: "Nalugumavu Bath Bar",
    },
    {
      author: "Siddharth Rao",
      city: "Chennai",
      rating: 5,
      review: "Thinai and Kavuni Black Rice cookies taste genuinely homemade. Not overly sweet, packed with fiber, and my kids love them.",
      product: "Kavuni Black Rice Cookies",
    },
  ];

  return (
    <PageShell>
      <main className="space-y-16 pb-20 pt-4">
        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* 2. BRAND VALUES (Clean horizontal bar) */}
        <section className="bg-white border border-[#E5DFD5] p-5 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2.5">
              <HeartHandshake className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Handcrafted</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Leaf className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Botanical Ingredients</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Sparkles className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Made with Care</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Traditional Wisdom</span>
            </div>
          </div>
        </section>

        {/* 3. FEATURED COLLECTION */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5DFD5] pb-3 gap-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C5A059]">BOTANICAL ESSENTIALS</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F]">Crafted for Your Daily Ritual</h2>
            </div>
            <Link href="/shop" className="text-xs font-bold tracking-wider uppercase text-[#1A3C2F] hover:text-[#C5A059] transition flex items-center gap-1">
              Explore Full Collection &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} imageAspect="portrait" />
            ))}
          </div>
        </section>

        {/* 4. SHOP BY CATEGORY */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5DFD5] pb-3 gap-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C5A059]">CURATED RITUALS</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F]">Shop by Category</h2>
            </div>
            <Link href="/shop" className="text-xs font-bold tracking-wider uppercase text-[#1A3C2F] hover:text-[#C5A059] transition">
              View All Categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.title} category={cat} />
            ))}
          </div>
        </section>

        {/* 5. BEST SELLERS (Artisanal Bath Bars Focus) */}
        <section className="space-y-6 bg-[#F3EDE4] border border-[#E5DFD5] p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5DFD5] pb-3 gap-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C5A059]">HANDMADE COLD-PROCESS SOAPS</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F]">Our Artisanal Bath Bars</h2>
              <p className="text-xs text-[#556B61] mt-1">Cold-processed over 6 weeks with goat milk, unrefined shea butter, and pure essential oils.</p>
            </div>
            <Link href="/shop?category=Bath Bars" className="text-xs font-bold tracking-wider uppercase text-[#1A3C2F] hover:text-[#C5A059] transition shrink-0">
              View All Bath Bars &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 pt-2">
            {bathBars.map((product) => (
              <ProductCard key={product.id} product={product} imageAspect="portrait" />
            ))}
          </div>
        </section>

        {/* 6. OUR STORY (Editorial Split Section) */}
        <section className="bg-white border border-[#E5DFD5] p-6 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2] border border-[#E5DFD5]">
              <Image
                src="/api/images/nalugumavu_bath_bar"
                alt="Handcrafted YUVA NATURALS Ayurvedic Bath Bar Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border-[12px] border-white/20 pointer-events-none" />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C5A059]">
                OUR HERITAGE &amp; BOTANICAL CRAFT
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A3C2F] leading-tight">
                Rooted in nature.<br />
                Crafted with care.
              </h2>
              <p className="text-xs sm:text-sm text-[#3E564A] leading-relaxed">
                YUVA NATURALS combines traditional Indian herbal knowledge with carefully selected natural ingredients. Every bath bar is cold-processed to retain vital nutrients, and every cookie is slow-baked with whole traditional grains and unrefined jaggery.
              </p>
              <p className="text-xs text-[#556B61] leading-relaxed">
                We believe skin and hair care should be free of aggressive harsh detergents, artificial fragrances, and cheap fillers. Our promise is small-batch botanical purity.
              </p>

              <div className="pt-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#1A3C2F] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#122B22] transition"
                >
                  DISCOVER OUR STORY <ArrowRight className="h-3.5 w-3.5 text-[#C5A059]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. INGREDIENT PHILOSOPHY */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C5A059]">BOTANICAL PURITY</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F]">Ingredient Philosophy</h2>
            <p className="text-xs text-[#556B61]">Thoughtfully chosen flora, fresh farm milk, and cold-pressed seed oils.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INGREDIENTS_PHILOSOPHY.map((ing) => (
              <div key={ing.name} className="bg-white border border-[#E5DFD5] p-4 flex flex-col justify-between space-y-3">
                <div className="relative aspect-video w-full overflow-hidden bg-[#FAF7F2]">
                  <Image src={ing.image} alt={ing.name} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#C5A059]">{ing.benefit}</span>
                  <h3 className="text-sm font-bold text-[#1A3C2F] font-serif">{ing.name}</h3>
                  <p className="text-xs text-[#556B61] leading-relaxed">{ing.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. CUSTOMER TESTIMONIALS */}
        <section className="bg-[#F3EDE4] border border-[#E5DFD5] p-6 sm:p-12 space-y-8">
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C5A059]">VERIFIED REVIEWS</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F]">Words From Our Community</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white border border-[#E5DFD5] p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <Quote className="h-6 w-6 text-[#C5A059] opacity-60" />
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#3E564A] leading-relaxed italic font-serif">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#1A3C2F]">{t.author}</p>
                    <p className="text-[10px] text-[#7C907C]">{t.city}</p>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. FINAL CTA */}
        <section className="bg-[#1A3C2F] text-[#FAF7F2] p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C5A059]">
            DAILY BOTANICAL WELLNESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
            Bring Nature Into Your Everyday Ritual
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 max-w-lg mx-auto leading-relaxed">
            Experience handcrafted cold-processed soaps, high-potency hair mists, and nutrient-dense traditional grain cookies delivered across India.
          </p>
          <div className="pt-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#C5A059] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[#1A3C2F] hover:bg-white transition"
            >
              SHOP ALL PRODUCTS <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}


