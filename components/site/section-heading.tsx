export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-xs font-black uppercase text-[#c6a15b]">{eyebrow}</p>
      <h2 className="text-3xl font-black leading-tight text-[#102019] md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-[#56635d]">{text}</p>}
    </div>
  );
}
