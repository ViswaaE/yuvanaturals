import Link from "next/link";
import { YuvaLogo } from "./yuva-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#173F32]/10 bg-[#0D2F25] text-[#FCFAF5]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <YuvaLogo variant="footer" showTagline={false} />
            <p className="text-xs leading-relaxed text-[#FCFAF5]/70">
              Handcrafted botanical skincare, artisanal bath bars, and wholesome millet cookies rooted in traditional Indian wisdom.
            </p>
          </div>

          {/* SHOP Column */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">SHOP</h4>
            <ul className="mt-4 space-y-2 text-xs text-[#FCFAF5]/80">
              <li><Link href="/shop" className="hover:text-[#C9A45C] transition">All Products</Link></li>
              <li><Link href="/shop?category=Bath Bars" className="hover:text-[#C9A45C] transition">Bath Bars</Link></li>
              <li><Link href="/shop?category=Premium Shampoos" className="hover:text-[#C9A45C] transition">Shampoos</Link></li>
              <li><Link href="/shop?category=Organic Skincare" className="hover:text-[#C9A45C] transition">Skincare</Link></li>
              <li><Link href="/cookies" className="hover:text-[#C9A45C] transition font-semibold text-[#C9A45C]">Cookies</Link></li>
              <li><Link href="/shop?collection=Gift Collections" className="hover:text-[#C9A45C] transition">Gifts</Link></li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">ABOUT</h4>
            <ul className="mt-4 space-y-2 text-xs text-[#FCFAF5]/80">
              <li><Link href="/about" className="hover:text-[#C9A45C] transition">Our Story</Link></li>
              <li><Link href="/#ingredients" className="hover:text-[#C9A45C] transition">Ingredients</Link></li>
              <li><Link href="/about" className="hover:text-[#C9A45C] transition">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9A45C] transition">Contact</Link></li>
            </ul>
          </div>

          {/* HELP Column */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">HELP</h4>
            <ul className="mt-4 space-y-2 text-xs text-[#FCFAF5]/80">
              <li><Link href="/faq" className="hover:text-[#C9A45C] transition">Shipping</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#C9A45C] transition">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-[#C9A45C] transition">FAQs</Link></li>
              <li><Link href="/cart" className="hover:text-[#C9A45C] transition">Track Order</Link></li>
            </ul>
          </div>

          {/* CONNECT Column */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">CONNECT</h4>
            <ul className="mt-4 space-y-2 text-xs text-[#FCFAF5]/80">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A45C] transition">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A45C] transition">Facebook</a></li>
              <li><a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A45C] transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-[#FCFAF5]/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FCFAF5]/60 gap-4">
          <p>© {new Date().getFullYear()} YUVA NATURALS</p>
          <p className="font-serif italic text-[#C9A45C]">Nature&apos;s Touch, Radiant Glow.</p>
        </div>
      </div>
    </footer>
  );
}
