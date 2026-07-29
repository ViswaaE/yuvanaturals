import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Leaf, ShieldCheck, HeartHandshake, Star, Instagram } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { AnimatedSection } from "@/components/animated-section";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { HeroSection } from "@/components/hero-section";
import { CategoryCard } from "@/components/category-card";
import { categories, products } from "@/constants/products";

export default function Home() {
  const bestSellers = products.slice(0, 4); // Manjishtha, Red Wine Glow Gel, Red Wine Toner, Raspberry Lip Balm
  const featuredProducts = products.slice(4, 8); // Neem Toner, Charcoal Tulsi, Charcoal Coconut, Aloe Acne Gel

  const TESTIMONIALS = [
    {
      quote: "The Manjishtha & Goat Milk bath bar completely cured my winter dryness. The texture and lather feel like pure silk on my skin.",
      author: "Golden Amanda",
      role: "Verified Skincare Buyer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 5,
    },
    {
      quote: "Aloe Boosted Acne Face Gel cleared my breakouts in just 5 days. It's so cooling and absorbs instantly without greasiness.",
      author: "Priya Venkatesh",
      role: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      rating: 5,
    },
  ];

  const INSTAGRAM_POSTS = [
    {
      img: "https://images.unsplash.com/photo-1607006482602-765180037159?auto=format&fit=crop&w=600&q=80",
      handle: "@yuvanaturals",
      caption: "Morning bath ritual with Manjishtha & Goat Milk bath bar 🌸",
    },
    {
      img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      handle: "@yuvanaturals",
      caption: "Glass skin secret: 3 drops of Flora Lumin Elixir Serum ✨",
    },
  ];

  return (
    <PageShell>
      <main className="space-y-20 pb-16">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Curated Categories */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-white p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <SectionHeading
            eyebrow="Curated Categories"
            title="Curated Categories"
            description="Explore our artisanal collections crafted with goat milk, active plant botanicals, and cold-pressed oils."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {categories.slice(0, 3).map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}
          </div>
        </AnimatedSection>

        {/* 3. Our Bestsellers */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">Our Bestsellers</h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#C9A66B] hover:underline"
            >
              See all &gt;
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 4. Featured Products */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-white p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">Featured Products</h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#C9A66B] hover:underline"
            >
              See all &gt;
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        {/* 5. Why Our Craft Is Different & Rooted in Nature: Our Ingredients */}
        <AnimatedSection className="grid gap-8 lg:grid-cols-2">
          {/* Why Our Craft Is Different */}
          <div className="flex flex-col justify-between rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-8 shadow-sm sm:p-10">
            <div>
              <h3 className="text-3xl font-bold text-[#2E5E4E] font-serif">Why Our Craft Is Different</h3>
              <p className="mt-4 text-xs text-[#1F332B]/80 leading-relaxed">
                Handmade quality of cold-process soapmaking using unrefined shea butter, fresh goat milk, and pure botanicals. Each soap bar is cured for 6 full weeks to form natural glycerine.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E5E4E] hover:text-[#C9A66B] transition"
              >
                Learn More Consideration &rarr;
              </Link>
            </div>
          </div>

          {/* Rooted in Nature: Our Ingredients */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#F6F1E9] p-8 shadow-sm sm:p-10">
            <h3 className="text-3xl font-bold text-[#2E5E4E] font-serif">Rooted in Nature: Our Ingredients</h3>
            <p className="mt-4 text-xs text-[#1F332B]/80 leading-relaxed max-w-md">
              Our artisanal alchemy combines raw botanicals, cold-pressed plant oils, fresh goat milk, and aromatic roots.
            </p>

            <div className="mt-6 relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80"
                alt="Herbs and natural ingredients"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* 6. Glowing Testimonials */}
        <AnimatedSection className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-white p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">Glowing Testimonials</h2>
            <Link href="/about" className="text-xs font-bold uppercase tracking-wider text-[#C9A66B] hover:underline">
              See all &gt;
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
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 7. Instagram Gallery & Stay in the Loop */}
        <AnimatedSection className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Instagram Gallery */}
          <div className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C9A66B]">
              <Instagram className="h-4 w-4 text-[#2E5E4E]" /> Instagram Gallery
            </div>
            <h3 className="mt-2 text-2xl font-bold text-[#2E5E4E] font-serif">@yuvanaturals</h3>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {INSTAGRAM_POSTS.map((post, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-[#F6F1E9]">
                  <Image src={post.img} alt={post.caption} fill className="object-cover transition duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          {/* Stay in the Loop Newsletter Box */}
          <div className="flex flex-col justify-between rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#2E5E4E] p-8 text-[#FAF8F3] shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9A66B] font-bold">Newsletter</span>
              <h3 className="mt-3 text-3xl font-bold font-serif">Stay in the Loop</h3>
              <p className="mt-3 text-xs text-[#FAF8F3]/80 leading-relaxed">
                Join our botanical apothecary circle for private access to fresh small-batch bath bar drops and 15% off your first order.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs text-white placeholder:text-white/60 outline-none focus:border-[#C9A66B]"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[#C9A66B] py-3.5 text-xs font-bold uppercase tracking-widest text-[#2E5E4E] hover:bg-white transition shadow-md"
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
