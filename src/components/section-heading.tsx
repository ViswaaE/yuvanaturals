interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs uppercase tracking-[0.45em] text-[#9d6d4f]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f2a25] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-[#6e6258]">{description}</p> : null}
    </div>
  );
}
