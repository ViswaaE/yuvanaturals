import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <main className="rounded-[2.5rem] border border-[#2f2a25]/10 bg-[#fffdf9] p-8 shadow-[0_30px_90px_rgba(47,42,37,0.08)] sm:p-10 lg:p-14">
        <SectionHeading eyebrow="Privacy Policy" title="Your privacy is treated with care and respect." description="We collect only what is needed to fulfill your orders and improve your experience." />
        <div className="mt-8 rounded-[1.5rem] border border-[#2f2a25]/10 bg-[#f7efe6] p-8 text-base leading-8 text-[#6e6258]">
          <p>YUVA Naturals uses your information solely to process orders, provide customer support, and improve our services. We do not sell personal data to third parties.</p>
        </div>
      </main>
    </PageShell>
  );
}
