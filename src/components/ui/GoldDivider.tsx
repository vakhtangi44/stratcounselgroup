'use client'
import { useEffect, useRef, useState } from 'react'

export default function GoldDivider({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`flex items-center justify-center gap-3 ${className}`}>
      <div className={`h-[2px] bg-gradient-to-r from-transparent via-gold to-gold-dark transition-all duration-1000 ease-out ${visible ? 'w-16' : 'w-0'}`} />
      <div className={`w-2 h-2 rotate-45 border-2 border-gold-dark transition-all duration-700 delay-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
      <div className={`h-[2px] bg-gradient-to-l from-transparent via-gold to-gold-dark transition-all duration-1000 ease-out ${visible ? 'w-16' : 'w-0'}`} />
    </div>
  )
}
