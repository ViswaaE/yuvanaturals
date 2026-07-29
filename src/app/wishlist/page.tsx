import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/constants/products";

export default function WishlistPage() {
  return (
    <PageShell>
      <main className="rounded-[2.5rem] border border-[#2f2a25]/10 bg-[#fffdf9] p-8 shadow-[0_30px_90px_rgba(47,42,37,0.08)] sm:p-10 lg:p-14">
        <SectionHeading eyebrow="Wishlist" title="Your saved rituals." description="Keep your favorite formulas close at hand." />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
