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
      <div className={`h-[1px] bg-gradient-to-r from-transparent to-gold transition-all duration-1000 ease-out ${visible ? 'w-16' : 'w-0'}`} />
      <div className={`w-1.5 h-1.5 rotate-45 border border-gold transition-all duration-700 delay-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
      <div className={`h-[1px] bg-gradient-to-l from-transparent to-gold transition-all duration-1000 ease-out ${visible ? 'w-16' : 'w-0'}`} />
    </div>
  )
}
