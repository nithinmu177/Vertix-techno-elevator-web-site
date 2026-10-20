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
    <div className={`mb-10 ${centered ? "mx-auto text-center max-w-3xl" : "max-w-3xl"}`}>
      <div className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] ${centered ? "justify-center" : ""}`}>
        <span className="inline-block size-2 rounded-full bg-[#2563EB]" />
        <span>{eyebrow}</span>
        <span className="h-0.5 w-6 bg-blue-100" />
      </div>
      <h2 className="display-type text-3xl font-bold tracking-tight text-[#172B4D] md:text-4xl lg:text-5xl leading-[1.2]">
        {title}
      </h2>
      {text && <p className="mt-3.5 text-base leading-relaxed text-[#475569] md:text-lg">{text}</p>}
    </div>
  );
}
