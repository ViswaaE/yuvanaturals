import Link from "next/link";
import { Camera, MessageCircle, ShieldCheck, Leaf, Truck, Heart } from "lucide-react";
import { YuvaLogo } from "./yuva-logo";

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
              <p className="text-xs font-bold uppercase tracking-wider text-[#FAF8F3]">100% Organic Botanicals</p>
              <p className="text-[11px] text-[#7A9474]">Cold-pressed plant extracts & goat milk</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#C9A66B]/20 p-2.5 text-[#C9A66B]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FAF8F3]">Cruelty-Free Craft</p>
              <p className="text-[11px] text-[#7A9474]">Traditional cold-process method</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#C9A66B]/20 p-2.5 text-[#C9A66B]">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FAF8F3]">Free Express Delivery</p>
              <p className="text-[11px] text-[#7A9474]">On orders over ₹500</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#C9A66B]/20 p-2.5 text-[#C9A66B]">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FAF8F3]">Handcrafted Batches</p>
              <p className="text-[11px] text-[#7A9474]">Freshly formulated artisanal care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <YuvaLogo variant="footer" showTagline={true} />
            <p className="text-xs leading-relaxed text-[#FAF8F3]/80">
              Yuva Naturals is an artisanal luxury skincare and personal care brand dedicated to pure goat milk bath bars, botanical shampoos, and organic skincare formulations.
            </p>
            <div className="flex gap-3 text-[#C9A66B]">
              <a href="#" className="rounded-full border border-white/10 p-2 hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition" aria-label="Instagram">
                <Camera className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full border border-white/10 p-2 hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition" aria-label="Facebook">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full border border-white/10 p-2 hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition" aria-label="X / Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Shop Categories</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FAF8F3]/80">
              <li><Link href="/shop?category=Bath Bars" className="hover:text-[#C9A66B] transition">Bath Bars</Link></li>
              <li><Link href="/shop?category=Herbal Soaps" className="hover:text-[#C9A66B] transition">Herbal Soaps</Link></li>
              <li><Link href="/shop?category=Premium Shampoos" className="hover:text-[#C9A66B] transition">Premium Shampoos</Link></li>
              <li><Link href="/shop?category=Organic Skincare" className="hover:text-[#C9A66B] transition">Organic Skincare</Link></li>
              <li><Link href="/shop?category=Lip Care" className="hover:text-[#C9A66B] transition">Lip Care</Link></li>
              <li><Link href="/shop?collection=Gift Collections" className="hover:text-[#C9A66B] transition">Gift Collections</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Curated Collections</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FAF8F3]/80">
              <li><Link href="/shop?collection=Best Sellers" className="hover:text-[#C9A66B] transition">Best Sellers</Link></li>
              <li><Link href="/shop?collection=New Arrivals" className="hover:text-[#C9A66B] transition">New Arrivals</Link></li>
              <li><Link href="/shop?slug=premium-pure-goat-milk-lavender-bath-bar" className="hover:text-[#C9A66B] transition">Lavender Goat Milk Bar</Link></li>
              <li><Link href="/shop?slug=red-wine-mulberry-glow-gel" className="hover:text-[#C9A66B] transition">Red Wine & Mulberry Gel</Link></li>
              <li><Link href="/shop?slug=flaxseed-root-strengthening-shampoo" className="hover:text-[#C9A66B] transition">Flaxseed Shampoo</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">Customer Rituals</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FAF8F3]/80">
              <li><Link href="/about" className="hover:text-[#C9A66B] transition">Our Botanical Story</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9A66B] transition">Contact Apothecary</Link></li>
              <li><Link href="/faq" className="hover:text-[#C9A66B] transition">FAQ & Shipping</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#C9A66B] transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#C9A66B] transition">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-[11px] text-[#FAF8F3]/60">
          <p>© {new Date().getFullYear()} Yuva Naturals. All Rights Reserved. Crafted with care for radiant skin.</p>
        </div>
      </div>
    </footer>
  );
}
