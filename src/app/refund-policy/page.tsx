import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export default function RefundPolicyPage() {
  return (
    <PageShell>
      <main className="rounded-[2.5rem] border border-[#2f2a25]/10 bg-[#fffdf9] p-8 shadow-[0_30px_90px_rgba(47,42,37,0.08)] sm:p-10 lg:p-14">
        <SectionHeading eyebrow="Refund Policy" title="Returns and exchanges made simple." description="We want every ritual to feel right from the first experience." />
        <div className="mt-8 rounded-[1.5rem] border border-[#2f2a25]/10 bg-[#f7efe6] p-8 text-base leading-8 text-[#6e6258]">
          <p>If your order arrives damaged or incorrect, please contact us within 7 days for a replacement or refund. Products that have been opened or used may be reviewed on a case-by-case basis.</p>
        </div>
      </main>
    </PageShell>
  );
}
