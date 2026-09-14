import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CategoryCardData {
  title: string;
  image: string;
  href: string;
}

export function CategoryCard({ category }: { category: CategoryCardData }) {
  return (
    <Link
      href={category.href}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white p-3.5 shadow-xs transition hover:border-[#173F32]/40 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#F7F2E8]">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-[#173F32] group-hover:text-[#C9A45C] transition">
          {category.title}
        </h3>
        <span className="text-xs font-semibold text-[#173F32] group-hover:text-[#C9A45C] group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Shop Now <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

