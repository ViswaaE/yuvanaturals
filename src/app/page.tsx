import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Leaf, ShieldCheck, HeartHandshake, Star, Camera, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { AnimatedSection } from "@/components/animated-section";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { HeroSection } from "@/components/hero-section";
import { CategoryCard } from "@/components/category-card";
import { categories, products } from "@/constants/products";

export default function Home() {
  const bestSellers = products.filter((p) => p.collections.includes("Best Sellers"));
  const newArrivals = products.filter((p) => p.collections.includes("New Arrivals"));
  const skincareProducts = products.filter((p) => p.category === "Organic Skincare" || p.category === "Lip Care");
  const hairCareProducts = products.filter((p) => p.category === "Premium Shampoos");
  const customerFavorites = products.filter((p) => p.rating >= 4.9).slice(0, 4);

  const ORGANIC_INGREDIENTS = [
    {
      name: "Pure Fresh Goat Milk",
      benefit: "Rich in lactic acid and skin-nourishing fatty acids to soothe and soften dry skin.",
      icon: "🥛",
    },
    {
      name: "Manjishtha & Licorice Root",
      benefit: "Traditional Ayurvedic roots that fade hyperpigmentation and brighten dull skin tone.",
      icon: "🌱",
    },
    {
      name: "Organic Red Wine Resveratrol",
      benefit: "Potent polyphenol antioxidant defense against oxidative aging and dullness.",
      icon: "🍇",
    },
    {
      name: "Organic Hibiscus & Flaxseed",
      benefit: "Strengthens hair follicles, combats dandruff flakes, and boosts radiant natural shine.",
      icon: "🌺",
    },
  ];

  const TESTIMONIALS = [
    {
      quote: "The Goat Milk & Lavender Bath Bar completely transformed my daily bathing ritual. My skin is noticeably soft, hydrated, and calm.",
      author: "Ananya Patel",
      role: "Verified Skincare Buyer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 5,
    },
    {
      quote: "Aloe Boosted Acne Face Gel cleared my cheeks within a week without drying out my face. Absorbs so fast!",
      author: "Priya Venkatesh",
      role: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      rating: 5,
    },
  ];

  return (
    <PageShell>
      <main className="space-y-20 pb-16">
        {/* 1. Hero Banner */}
        <HeroSection />

        {/* 2. Featured Collections */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-white p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <SectionHeading
            eyebrow="Botanical Collections"
            title="Explore Featured Collections"
            description="Handcrafted with raw goat milk, cold-pressed plant oils, aromatic herbs, and ancient bathing traditions."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}
          </div>
        </AnimatedSection>

        {/* 3. Best Sellers */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Customer Favorites</span>
              <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">Best Sellers</h2>
            </div>
            <Link
              href="/shop?collection=Best Sellers"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2E5E4E] hover:text-[#C9A66B]"
            >
              Shop All Best Sellers →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 4. New Arrivals */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-white p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Fresh Batches</span>
              <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">New Arrivals</h2>
            </div>
            <Link
              href="/shop?collection=New Arrivals"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2E5E4E] hover:text-[#C9A66B]"
            >
              Explore Fresh Drops →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 5. Organic Ingredients Section */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#FAF8F3] p-8 shadow-sm sm:p-10 lg:p-14">
          <SectionHeading
            eyebrow="Pure & Earth-Grown"
            title="Organic Botanical Ingredients"
            description="Every formula is crafted with pure natural ingredients selected for their soothing, restorative, and skin-transforming benefits."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ORGANIC_INGREDIENTS.map((item) => (
              <div key={item.name} className="flex flex-col justify-between rounded-2xl border border-[#2E5E4E]/10 bg-white p-6 shadow-sm hover:border-[#C9A66B] transition">
                <div>
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="mt-4 text-base font-bold text-[#2E5E4E] font-serif">{item.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#1F332B]/80">{item.benefit}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-[#2E5E4E]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C9A66B]" /> 100% Organically Sourced
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 6. Featured Skincare */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-white p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Radiant Complexion</span>
              <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">Featured Skincare & Lip Care</h2>
            </div>
            <Link
              href="/shop?category=Organic Skincare"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2E5E4E] hover:text-[#C9A66B]"
            >
              Shop Skincare Range →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skincareProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 7. Premium Hair Care */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Scalp & Hair Fortification</span>
              <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">Premium Hair Care</h2>
            </div>
            <Link
              href="/shop?category=Premium Shampoos"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2E5E4E] hover:text-[#C9A66B]"
            >
              Explore Hair Care →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {hairCareProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 8. Customer Favorites */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-white p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">Glowing Customer Reviews</h2>
            <Link href="/about" className="text-xs font-bold uppercase tracking-wider text-[#C9A66B] hover:underline">
              Read All Stories →
            </Link>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <div key={item.author} className="flex flex-col sm:flex-row items-center gap-6 rounded-[2rem] border border-[#2E5E4E]/10 bg-[#F6F1E9] p-6">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#C9A66B]">
                  <Image src={item.avatar} alt={item.author} fill className="object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start gap-1 text-[#C9A66B]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#1F332B]/80 font-medium">“{item.quote}”</p>
                  <p className="mt-3 text-sm font-bold text-[#2E5E4E] font-serif">{item.author}</p>
                  <p className="text-[10px] text-[#C9A66B] uppercase font-bold tracking-wider">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 9. Newsletter Section */}
        <AnimatedSection className="flex flex-col justify-between rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#2E5E4E] p-8 sm:p-12 text-[#FAF8F3] shadow-xl">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A66B] font-bold">Yuva Naturals Apothecary</span>
            <h3 className="mt-3 text-3xl sm:text-4xl font-bold font-serif">Stay in the Loop</h3>
            <p className="mt-3 text-xs sm:text-sm text-[#FAF8F3]/80 leading-relaxed">
              Join our botanical apothecary circle for private access to fresh small-batch bath bar releases, botanical skincare tips, and 15% off your first order.
            </p>

            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs text-white placeholder:text-white/60 outline-none focus:border-[#C9A66B]"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-[#C9A66B] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#2E5E4E] hover:bg-white transition shadow-md whitespace-nowrap"
              >
                Sign Up Now
              </button>
            </form>
          </div>
        </AnimatedSection>
      </main>
    </PageShell>
  );
}
