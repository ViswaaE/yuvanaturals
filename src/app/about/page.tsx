import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { Sparkles, Leaf, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <PageShell>
      <main className="space-y-16 pb-16">
        {/* Banner Hero */}
        <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-12 lg:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2E5E4E]/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A66B]">
              <Sparkles className="h-3.5 w-3.5" /> Our Botanical Heritage
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-[#2E5E4E] sm:text-5xl lg:text-6xl font-serif">
              Rooted in Nature, Handcrafted with Intention.
            </h1>
            <p className="mt-6 text-base text-[#1F332B]/80 leading-relaxed sm:text-lg">
              YUVA Naturals was born from a desire to bring back the timeless art of slow, cold-processed herbal soapmaking and flora skin elixirs.
            </p>
          </div>
        </section>

        {/* Brand Story Grid */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A66B]">Brand Story</span>
            <h2 className="mt-3 text-3xl font-bold text-[#2E5E4E] font-serif">The Art of the Handmade</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#1F332B]/80">
              Each YUVA Naturals bath bar and elixir is produced in micro-batches using traditional cold-process soapmaking. We cure our bars for 6 full weeks on cedar drying racks, allowing natural glycerine to form and preserve the living vitality of fresh goat milk, Manjishtha root, and active botanicals.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#1F332B]/80">
              Unlike mass-manufactured soaps that strip skin of essential lipids, our formulas nurture the skin barrier, leaving it soft, velvety, and balanced.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#F6F1E9]">
              <Image
                src="https://images.unsplash.com/photo-1607006482602-765180037159?auto=format&fit=crop&w=800&q=80"
                alt="Soap cutting process"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#F6F1E9]">
              <Image
                src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80"
                alt="Herb mortar and pestle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#2E5E4E] p-8 text-[#FAF8F3] shadow-xl sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-[#C9A66B] font-bold">Our Mission</span>
              <h2 className="mt-3 text-3xl font-bold font-serif sm:text-4xl">Sustainable Luxury & Pure Integrity</h2>
              <p className="mt-4 text-sm text-[#FAF8F3]/80 leading-relaxed">
                We believe high-performance skincare should never come at the expense of our planet. All our packaging is 100% recyclable, biodegradable, and plastic-neutral. We source fair-trade shea butter, organic virgin coconut oil, and wild-harvested Indian herbs directly from sustainable agricultural cooperatives.
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-[#C9A66B] font-bold">Vision for a Conscious Future</span>
              <h2 className="mt-3 text-3xl font-bold font-serif sm:text-4xl">Mindful Rituals Over Fast Beauty</h2>
              <p className="mt-4 text-sm text-[#FAF8F3]/80 leading-relaxed">
                Our vision is to replace synthetic bathroom clutter with a few elevated, multi-beneficial formulas that turn daily bathing into a restorative sanctuary.
              </p>
            </div>
          </div>
        </section>

        {/* Crafting Process Steps */}
        <section className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-8 sm:p-12 lg:p-16">
          <SectionHeading
            eyebrow="Crafting Process"
            title="From Botanical Harvest to Your Bathing Ritual"
            description="Four careful steps that define the YUVA Naturals standard of excellence."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Ethical Harvest",
                desc: "Hand-picking wild Manjishtha, Veppalai, Tulsi, and Kuppaimeni at peak botanical potency.",
                icon: Leaf,
              },
              {
                step: "02",
                title: "Goat Milk Infusion",
                desc: "Blending farm-fresh goat milk with cold-pressed extra virgin olive oil and unrefined shea butter.",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "6-Week Cold Cure",
                desc: "Slow aging on natural cedarwood racks to allow full saponification and rich natural glycerine formation.",
                icon: ShieldCheck,
              },
              {
                step: "04",
                title: "Hand Wrapped",
                desc: "Each bar is inspected, hand-cut, stamped, and wrapped in eco-friendly parchment paper.",
                icon: Heart,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="rounded-[2rem] border border-[#2E5E4E]/10 bg-[#F6F1E9] p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-[#C9A66B]">{item.step}</span>
                    <Icon className="h-6 w-6 text-[#2E5E4E]" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#2E5E4E] font-serif">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#1F332B]/80">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-10 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif sm:text-4xl">Experience the YUVA Difference</h2>
          <p className="mt-3 text-sm text-[#1F332B]/80 max-w-xl mx-auto">
            Discover our small-batch cold-processed bath bars and flora elixirs.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#2E5E4E] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition shadow-md"
            >
              Shop Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
