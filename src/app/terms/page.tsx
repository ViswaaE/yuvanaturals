import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export default function TermsPage() {
  return (
    <PageShell>
      <main className="rounded-[2.5rem] border border-[#2f2a25]/10 bg-[#fffdf9] p-8 shadow-[0_30px_90px_rgba(47,42,37,0.08)] sm:p-10 lg:p-14">
        <SectionHeading eyebrow="Terms" title="Our terms of service." description="By shopping with YUVA Naturals, you agree to the following conditions." />
        <div className="mt-8 rounded-[1.5rem] border border-[#2f2a25]/10 bg-[#f7efe6] p-8 text-base leading-8 text-[#6e6258]">
          <p>All product descriptions are intended to be informative. Please review ingredients and usage directions before use. We reserve the right to update these terms as needed.</p>
        </div>
      </main>
    </PageShell>
  );
}
