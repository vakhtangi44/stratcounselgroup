'use client'

import { useEffect, useState } from 'react'

export default function HeroAnimations() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Animated horizontal gold line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] pointer-events-none z-0">
        <div
          className={`h-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-all ease-out ${
            mounted ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
          style={{ transitionDuration: '2s', transitionDelay: '1s' }}
        />
      </div>
    </>
  )
}
