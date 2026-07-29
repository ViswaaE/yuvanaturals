import Link from "next/link";
import { Sparkles, Instagram, Facebook, Mail, ShieldCheck, Leaf, Truck, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#C9A66B]/20 bg-[#2E5E4E] text-[#FAF8F3]">
      {/* Botanical Guarantees Banner */}
      <div className="border-b border-white/10 bg-[#1F332B] px-6 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#C9A66B]/20 p-2.5 text-[#C9A66B]">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FAF8F3]">100% Organic Ingredients</p>
              <p className="text-[11px] text-[#7A9474]">Pure cold-pressed botanicals</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#C9A66B]/20 p-2.5 text-[#C9A66B]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FAF8F3]">Cruelty-Free Craft</p>
              <p className="text-[11px] text-[#7A9474]">Leaping Bunny Certified</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#C9A66B]/20 p-2.5 text-[#C9A66B]">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FAF8F3]">Free Luxury Shipping</p>
              <p className="text-[11px] text-[#7A9474]">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#C9A66B]/20 p-2.5 text-[#C9A66B]">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FAF8F3]">Handmade in Batches</p>
              <p className="text-[11px] text-[#7A9474]">Artisanal care & freshness</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A66B] text-[#2E5E4E]">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-[0.2em] font-serif text-[#FAF8F3]">
                YUVA NATURALS
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#FAF8F3]/80">
              An editorial luxury skincare brand rooted in nature, cold-pressed plant oils, fresh goat milk, and ancient herbal bathing wisdom.
            </p>
            <div className="flex gap-3 text-[#C9A66B]">
              <a href="#" className="rounded-full border border-white/10 p-2 hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full border border-white/10 p-2 hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full border border-white/10 p-2 hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition" aria-label="X / Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Product Catalog</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FAF8F3]/80">
              <li><Link href="/shop" className="hover:text-[#C9A66B] transition">Bath Bars & Soaps</Link></li>
              <li><Link href="/shop" className="hover:text-[#C9A66B] transition">Luxury Herbal Soaps</Link></li>
              <li><Link href="/shop" className="hover:text-[#C9A66B] transition">Flora Lumin Elixir Serum</Link></li>
              <li><Link href="/shop" className="hover:text-[#C9A66B] transition">Organic Skincare</Link></li>
              <li><Link href="/shop" className="hover:text-[#C9A66B] transition">Gift Collections</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Customer Rituals</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FAF8F3]/80">
              <li><Link href="/about" className="hover:text-[#C9A66B] transition">Our Craft & Story</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9A66B] transition">Contact Apothecary</Link></li>
              <li><Link href="/faq" className="hover:text-[#C9A66B] transition">Frequently Asked Questions</Link></li>
              <li><Link href="/terms" className="hover:text-[#C9A66B] transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#C9A66B] transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Stay in the Loop</h3>
            <p className="text-xs text-[#FAF8F3]/80 leading-relaxed">
              Subscribe to receive private access to small-batch soap releases, herbal rituals, and 15% off your first order.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs text-white placeholder:text-white/60 outline-none focus:border-[#C9A66B]"
              />
              <button className="w-full rounded-full bg-[#C9A66B] py-2.5 text-xs font-bold uppercase tracking-wider text-[#2E5E4E] hover:bg-white transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[11px] text-[#7A9474] sm:flex-row">
          <p>© {new Date().getFullYear()} YUVA Naturals Apothecary. All rights reserved.</p>
          <p>Handcrafted with Care & Nature’s Touch.</p>
        </div>
      </div>
    </footer>
  );
}
