/** Zcorebit wordmark: solid orange "Z" + white bold "corebit" (matches the brand logo supplied by the owner). */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline text-[1.9rem] font-bold leading-none tracking-tight text-white md:text-[2.25rem] ${className}`} style={{ fontFamily: "'Space Grotesk Variable', sans-serif" }}>
      <span className="text-[#f48a4f]">Z</span>corebit
    </span>
  );
}
