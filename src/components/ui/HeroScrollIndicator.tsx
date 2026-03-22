'use client'

export default function HeroScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-hint">
      <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <svg
        className="w-4 h-4 text-gold/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}
