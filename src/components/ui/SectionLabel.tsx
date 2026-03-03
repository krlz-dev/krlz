export default function SectionLabel({
  text,
  centered = false,
}: {
  text: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`section-label-line flex items-center gap-4 mb-10 ${
        centered ? "justify-center" : ""
      }`}
    >
      <span className="font-mono text-[0.7rem] font-medium tracking-[0.12em] uppercase text-accent">
        {text}
      </span>
    </div>
  );
}
