import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: {
    title: string;
    description: string;
    image: string;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href="/shop"
      className="group relative flex flex-col overflow-hidden rounded-[2.25rem] border border-[#2E5E4E]/10 bg-white p-4 shadow-[0_20px_50px_rgba(46,94,78,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(46,94,78,0.14)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-[#F6F1E9]">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between px-2 pb-2 pt-4">
        <div>
          <h3 className="text-xl font-bold text-[#2E5E4E] font-serif transition group-hover:text-[#C9A66B]">
            {category.title}
          </h3>
          <p className="mt-1.5 text-xs text-[#1F332B]/75 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A66B]">
          Explore Category <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
