export default function SkillTag({ name }: { name: string }) {
  return (
    <span className="font-mono text-[0.75rem] font-medium py-2.5 px-5 rounded-full border border-border bg-bg-surface text-text-secondary transition-all duration-300 cursor-default hover:border-accent hover:text-accent hover:bg-accent-dim hover:-translate-y-0.5">
      {name}
    </span>
  );
}
