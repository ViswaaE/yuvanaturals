import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, HeartHandshake, Leaf, Sparkles, Clock, MessageSquare } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { HeroSection } from "@/components/hero-section";
import { CategoryCard, type CategoryCardData } from "@/components/category-card";
import { products } from "@/constants/products";

export default function Home() {
  // Category cards data
  const CATEGORIES: CategoryCardData[] = [
    { title: "Bath Bars", image: "/api/images/goat_milk_lavender_bar", href: "/shop?category=Bath Bars" },
    { title: "Shampoos", image: "/api/images/hibiscus_shampoo", href: "/shop?category=Premium Shampoos" },
    { title: "Skincare", image: "/api/images/rose_aura_toner", href: "/shop?category=Organic Skincare" },
    { title: "Lip Care", image: "/api/images/raspberry_lip_balm", href: "/shop?category=Lip Care" },
    { title: "Cookies", image: "/api/images/thinai_cookies", href: "/cookies" },
    { title: "Gift Collections", image: "/api/images/nalugumavu_bath_bar", href: "/shop?collection=Gift Collections" },
  ];

  // Best Sellers (4 desktop, 2-3 tablet, 1-2 mobile)
  const bestSellers = products.filter((p) => p.badge === "Best Seller").slice(0, 4);

  // Bath Bars (All 6 requested)
  const bathBars = products.filter((p) => p.category === "Bath Bars");

  // Shampoos (All 3 requested)
  const shampoos = products.filter((p) => p.category === "Premium Shampoos");

  // Skincare & Lip Care (All 4 requested)
  const skincareProducts = products.filter(
    (p) => p.category === "Organic Skincare" || p.category === "Lip Care"
  );

  // Cookies (All 5 requested)
  const cookies = products.filter((p) => p.category === "Cookies");

  // Top Rated Products (sorted by rating and review count)
  const topRated = [...products].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 4);

  // Instagram feed images
  const INSTAGRAM_IMAGES = [
    "/api/images/goat_milk_lavender_bar",
    "/api/images/red_wine_glow_gel",
    "/api/images/hibiscus_shampoo",
    "/api/images/thinai_cookies",
    "/api/images/rose_aura_toner",
    "/api/images/nalugumavu_bath_bar",
  ];

  return (
    <PageShell>
      <main className="space-y-16 pb-16 pt-4">
        {/* 1. HERO BANNER */}
        <HeroSection />

        {/* 2. SHOP BY CATEGORY (Immediately below Hero) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h2 className="text-xl font-bold font-serif text-[#173F32]">Shop by Category</h2>
            <Link href="/shop" className="text-xs font-semibold text-[#173F32] hover:text-[#C9A45C] transition">
              View All Categories &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.title} category={cat} />
            ))}
          </div>
        </section>

        {/* 3. FEATURED PRODUCTS (Our Best Sellers) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div>
              <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-wider">FEATURED RITUALS</span>
              <h2 className="text-2xl font-bold font-serif text-[#173F32]">Our Best Sellers</h2>
            </div>
            <Link href="/shop?collection=Best Sellers" className="text-xs font-semibold text-[#173F32] hover:text-[#C9A45C] transition">
              Shop Best Sellers &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 4. BATH BAR PRODUCTS SECTION */}
        <section className="space-y-4 bg-[#F7F2E8] border border-stone-200/80 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-300/60 pb-3">
            <div>
              <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-wider">HANDCRAFTED SOAPS</span>
              <h2 className="text-2xl font-bold font-serif text-[#173F32]">Bath Bars</h2>
              <p className="text-xs text-stone-600">Pure goat milk and herbal oils cold-processed for gentle daily cleansing.</p>
            </div>
            <Link href="/shop?category=Bath Bars" className="text-xs font-semibold text-[#173F32] hover:text-[#C9A45C] transition shrink-0">
              View All Bath Bars &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 pt-2">
            {bathBars.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 5. SHAMPOOS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div>
              <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-wider">HAIR CARE</span>
              <h2 className="text-2xl font-bold font-serif text-[#173F32]">Botanical Shampoos</h2>
            </div>
            <Link href="/shop?category=Premium Shampoos" className="text-xs font-semibold text-[#173F32] hover:text-[#C9A45C] transition">
              Explore Shampoos &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {shampoos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 6. SKINCARE SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div>
              <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-wider">ORGANIC CARE</span>
              <h2 className="text-2xl font-bold font-serif text-[#173F32]">Skincare &amp; Lip Care</h2>
            </div>
            <Link href="/shop?category=Organic Skincare" className="text-xs font-semibold text-[#173F32] hover:text-[#C9A45C] transition">
              View Skincare &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {skincareProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 7. COOKIES SECTION (Separate Category) */}
        <section className="space-y-4 bg-[#F7F2E8] border border-stone-200/80 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-300/60 pb-3">
            <div>
              <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-wider">TRADITIONAL GRAINS</span>
              <h2 className="text-2xl font-bold font-serif text-[#173F32]">Wholesome Millet Cookies</h2>
              <p className="text-xs text-stone-600">300g packs of traditional millet cookies crafted with jaggery and pure cow ghee.</p>
            </div>
            <Link href="/cookies" className="text-xs font-semibold text-[#173F32] hover:text-[#C9A45C] transition shrink-0">
              Explore All Cookies &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
            {cookies.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 8. BRAND STORY SECTION */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F7F2E8] border border-stone-200">
              <Image
                src="/api/images/nalugumavu_bath_bar"
                alt="YUVA NATURALS Botanical Craftsmanship"
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A45C]">
                ABOUT YUVA NATURALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#173F32]">
                Natural Care, Made with Purpose
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xl">
                YUVA NATURALS combines traditional botanical ingredients with modern handcrafted care for skin, hair and everyday wellness.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-md bg-[#173F32] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FCFAF5] transition hover:bg-[#0D2F25]"
                >
                  OUR STORY <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 9. SHOP BY RATING / TOP RATED */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div>
              <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-wider">CUSTOMER FAVORITES</span>
              <h2 className="text-2xl font-bold font-serif text-[#173F32]">Top Rated Products</h2>
            </div>
            <Link href="/shop" className="text-xs font-semibold text-[#173F32] hover:text-[#C9A45C] transition">
              View All Catalog &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} showRating={true} />
            ))}
          </div>
        </section>

        {/* 10. WHY CHOOSE YUVA NATURALS */}
        <section className="bg-[#F7F2E8] border border-stone-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-wider">OUR COMMITMENT</span>
            <h2 className="text-2xl font-serif font-bold text-[#173F32]">Why Choose YUVA NATURALS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-stone-200 p-4 rounded-xl text-center space-y-2">
              <div className="inline-flex p-2.5 rounded-full bg-[#F7F2E8] text-[#173F32]">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#173F32]">Handcrafted with Care</h3>
              <p className="text-xs text-stone-600 leading-snug">
                Made in small batches using traditional cold-process methods.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-xl text-center space-y-2">
              <div className="inline-flex p-2.5 rounded-full bg-[#F7F2E8] text-[#173F32]">
                <Leaf className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#173F32]">Thoughtfully Selected Ingredients</h3>
              <p className="text-xs text-stone-600 leading-snug">
                Fresh goat milk, cold-pressed seed oils, and authentic botanicals.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-xl text-center space-y-2">
              <div className="inline-flex p-2.5 rounded-full bg-[#F7F2E8] text-[#173F32]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#173F32]">Botanical Inspired</h3>
              <p className="text-xs text-stone-600 leading-snug">
                Formulated using traditional Ayurvedic and herbal wisdom.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-xl text-center space-y-2">
              <div className="inline-flex p-2.5 rounded-full bg-[#F7F2E8] text-[#173F32]">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#173F32]">Made for Everyday Use</h3>
              <p className="text-xs text-stone-600 leading-snug">
                Gentle formulas crafted for your daily skin, hair, and snacking routines.
              </p>
            </div>
          </div>
        </section>

        {/* 11. WHATSAPP CTA SECTION */}
        <section className="bg-[#173F32] text-[#FCFAF5] rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex p-2 rounded-full bg-white/10 text-[#C9A45C]">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold">Need help choosing the right product?</h2>
          <p className="text-xs sm:text-sm text-[#FCFAF5]/80">Chat with us on WhatsApp for personal product guidance.</p>
          <div className="pt-2">
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#C9A45C] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0D2F25] hover:bg-white transition"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </section>

        {/* 12. INSTAGRAM SECTION (Follow YUVA NATURALS) */}
        <section className="space-y-4">
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-wider">@YUVANATURALS</span>
            <h2 className="text-2xl font-serif font-bold text-[#173F32]">Follow YUVA NATURALS</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INSTAGRAM_IMAGES.map((imgSrc, idx) => (
              <a
                key={idx}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-lg bg-stone-100 border border-stone-200"
              >
                <Image
                  src={imgSrc}
                  alt={`YUVA NATURALS Instagram photo ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#173F32]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                  View Post
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}

