import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <main className="flex min-h-[50vh] items-center justify-center rounded-[2.5rem] border border-[#2f2a25]/10 bg-[#fffdf9] p-8 shadow-[0_30px_90px_rgba(47,42,37,0.08)]">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9d6d4f]">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#2f2a25]">The page you’re looking for is unavailable.</h1>
          <p className="mt-4 text-base leading-8 text-[#6e6258]">Return to the shop to discover the latest in botanical self-care.</p>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-[#2f2a25] px-5 py-3 text-sm font-semibold text-[#f7efe6]">Back to Shop</Link>
        </div>
      </main>
    </PageShell>
  );
}
