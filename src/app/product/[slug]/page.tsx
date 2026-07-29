import { notFound } from "next";
import { PageShell } from "@/components/page-shell";
import { ProductDetailView } from "@/components/product-detail-view";
import { getProductBySlug, products } from "@/constants/products";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => product.relatedSlugs.includes(item.slug))
    .slice(0, 3);

  return (
    <PageShell>
      <main>
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </main>
    </PageShell>
  );
}
