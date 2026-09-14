import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CategoryCardData {
  title: string;
  description?: string;
  image: string;
  href: string;
}

export function CategoryCard({ category }: { category: CategoryCardData }) {
  return (
    <Link
      href={category.href}
      className="group relative flex flex-col overflow-hidden bg-white border border-[#E5DFD5] p-3 shadow-2xs transition-all duration-300 hover:border-[#1A3C2F] hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2]">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#1A3C2F]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="mt-3.5 flex flex-col justify-between flex-1 space-y-1.5 px-0.5">
        <div>
          <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-[#1A3C2F] group-hover:text-[#C5A059] transition-colors">
            {category.title}
          </h3>
          {category.description && (
            <p className="mt-1 text-[11px] text-[#556B61] line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        <span className="pt-1 text-[10px] font-bold uppercase tracking-widest text-[#1A3C2F] group-hover:text-[#C5A059] flex items-center gap-1">
          SHOP NOW <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}


