/** Zcorebit wordmark (the brand's own logo file is not publicly loadable, so this reproduces the wordmark in text). */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-[ 'Space_Grotesk_Variable',sans-serif] inline-flex items-baseline text-[1.65rem] font-bold leading-none tracking-tight text-white md:text-[2rem] ${className}`} style={{ fontFamily: "'Space Grotesk Variable', sans-serif" }}>
      <span className="bg-gradient-to-br from-[#ffb27a] to-[#f06927] bg-clip-text text-transparent">Z</span>corebit
    </span>
  );
}
