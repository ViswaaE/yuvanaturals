import Link from "next/link";
import { YuvaLogo } from "./yuva-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E5DFD5] bg-[#1A3C2F] text-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Address Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <YuvaLogo variant="footer" showTagline={true} />
            <p className="text-xs leading-relaxed text-[#FAF7F2]/80 max-w-sm">
              Handcrafted Ayurvedic bath bars, botanical shampoos, nourishing skincare, and wholesome millet cookies rooted in traditional Indian care.
            </p>
            <div className="pt-1 text-[11px] text-[#FAF7F2]/60 space-y-1">
              <p>Email: care@yuvanaturals.com</p>
              <p>WhatsApp Support: +91 98765 43210</p>
            </div>
          </div>

          {/* SHOP Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">SHOP COLLECTION</h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li><Link href="/shop?category=Bath Bars" className="hover:text-[#C5A059] transition">Bath Bars</Link></li>
              <li><Link href="/shop?category=Premium Shampoos" className="hover:text-[#C5A059] transition">Shampoos</Link></li>
              <li><Link href="/shop?category=Organic Skincare" className="hover:text-[#C5A059] transition">Skincare</Link></li>
              <li><Link href="/shop?category=Lip Care" className="hover:text-[#C5A059] transition">Lip Care</Link></li>
              <li><Link href="/cookies" className="hover:text-[#C5A059] transition font-medium text-[#C5A059]">Cookies</Link></li>
            </ul>
          </div>

          {/* CUSTOMER CARE Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">CUSTOMER CARE</h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li><Link href="/contact" className="hover:text-[#C5A059] transition">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#C5A059] transition">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#C5A059] transition">Returns &amp; Refunds</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#C5A059] transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#C5A059] transition">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          {/* BOTANICAL PHILOSOPHY (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">CONNECT</h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059] transition">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059] transition">Facebook</a></li>
              <li><a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059] transition">WhatsApp Direct</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Tagline */}
        <div className="mt-12 border-t border-[#FAF7F2]/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/60 gap-3">
          <p>&copy; {new Date().getFullYear()} YUVA NATURALS. All rights reserved.</p>
          <p className="font-serif text-[#C5A059] tracking-wider text-[11px]">&ldquo;Nature&apos;s Touch, Radiant Glow&rdquo;</p>
        </div>
      </div>
    </footer>
  );
}


