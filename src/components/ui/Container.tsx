export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[1200px] mx-auto px-8 max-md:px-5 ${className}`}>
      {children}
    </div>
  );
}
