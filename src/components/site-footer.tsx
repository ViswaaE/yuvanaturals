import Link from "next/link";
import { YuvaLogo } from "./yuva-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-[#0D2F25] text-[#FCFAF5]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Address Column */}
          <div className="lg:col-span-1 space-y-3.5">
            <YuvaLogo variant="footer" showTagline={false} />
            <p className="text-xs leading-relaxed text-[#FCFAF5]/75">
              Handcrafted botanical skincare, artisanal bath bars, and wholesome millet cookies rooted in traditional Indian care.
            </p>
            <div className="pt-2 text-[11px] text-[#FCFAF5]/60 space-y-1">
              <p>74 Botanical Gardens Way, Suite 400</p>
              <p>concierge@yuvanaturals.com</p>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C9A45C]">SHOP</h4>
            <ul className="mt-3 space-y-2 text-xs text-[#FCFAF5]/80">
              <li><Link href="/shop?category=Bath Bars" className="hover:text-[#C9A45C] transition">Bath Bars</Link></li>
              <li><Link href="/shop?category=Premium Shampoos" className="hover:text-[#C9A45C] transition">Shampoos</Link></li>
              <li><Link href="/shop?category=Organic Skincare" className="hover:text-[#C9A45C] transition">Skincare</Link></li>
              <li><Link href="/shop?category=Lip Care" className="hover:text-[#C9A45C] transition">Lip Care</Link></li>
              <li><Link href="/cookies" className="hover:text-[#C9A45C] transition font-medium text-[#C9A45C]">Cookies</Link></li>
              <li><Link href="/shop?collection=Gift Collections" className="hover:text-[#C9A45C] transition">Gift Collections</Link></li>
            </ul>
          </div>

          {/* CUSTOMER CARE Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C9A45C]">CUSTOMER CARE</h4>
            <ul className="mt-3 space-y-2 text-xs text-[#FCFAF5]/80">
              <li><Link href="/contact" className="hover:text-[#C9A45C] transition">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-[#C9A45C] transition">Shipping</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#C9A45C] transition">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-[#C9A45C] transition">FAQs</Link></li>
              <li><Link href="/cart" className="hover:text-[#C9A45C] transition">Track Order</Link></li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C9A45C]">ABOUT</h4>
            <ul className="mt-3 space-y-2 text-xs text-[#FCFAF5]/80">
              <li><Link href="/about" className="hover:text-[#C9A45C] transition">Our Story</Link></li>
              <li><Link href="/#ingredients" className="hover:text-[#C9A45C] transition">Ingredients</Link></li>
              <li><Link href="/about" className="hover:text-[#C9A45C] transition">Blog / Journal</Link></li>
            </ul>
          </div>

          {/* CONNECT Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C9A45C]">CONNECT</h4>
            <ul className="mt-3 space-y-2 text-xs text-[#FCFAF5]/80">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A45C] transition">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A45C] transition">Facebook</a></li>
              <li><a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A45C] transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#FCFAF5]/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FCFAF5]/60 gap-3">
          <p>&copy; {new Date().getFullYear()} YUVA NATURALS. All rights reserved.</p>
          <p className="font-serif italic text-[#C9A45C]">Natural Care for Skin, Hair &amp; Everyday Wellness</p>
        </div>
      </div>
    </footer>
  );
}

