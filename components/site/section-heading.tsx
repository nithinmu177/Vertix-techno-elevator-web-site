export function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false
}: {
  eyebrow: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? "mx-auto text-center max-w-3xl" : "max-w-3xl"}`}>
      <div className={`mb-3.5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] ${centered ? "justify-center" : ""}`}>
        <span className="inline-block size-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
        <span>{eyebrow}</span>
        <span className="h-px w-8 bg-gradient-to-r from-[#d4af37] to-transparent" />
      </div>
      <h2 className="display-type text-3xl font-black tracking-tight text-white md:text-5xl lg:text-5xl leading-[1.15]">
        {title}
      </h2>
      {text && <p className="mt-4 text-base leading-relaxed text-slate-300/80 md:text-lg">{text}</p>}
    </div>
  );
}
