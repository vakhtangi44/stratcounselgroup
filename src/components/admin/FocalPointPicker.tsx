'use client'

interface Props {
  src: string
  /** object-position value, e.g. "50% 50%" */
  value?: string
  onChange: (position: string) => void
}

function parse(value?: string): { x: number; y: number } {
  const m = (value || '50% 50%').match(/([\d.]+)%\s+([\d.]+)%/)
  if (!m) return { x: 50, y: 50 }
  return { x: Number(m[1]), y: Number(m[2]) }
}

export default function FocalPointPicker({ src, value, onChange }: Props) {
  const { x, y } = parse(value)

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = Math.min(100, Math.max(0, Math.round(((e.clientX - rect.left) / rect.width) * 100)))
    const py = Math.min(100, Math.max(0, Math.round(((e.clientY - rect.top) / rect.height) * 100)))
    onChange(`${px}% ${py}%`)
  }

  return (
    <div>
      <label className="block text-sm text-secondary mb-1">Focal point (click the main area)</label>
      <div
        onClick={handleClick}
        className="relative inline-block cursor-crosshair select-none overflow-hidden rounded border border-gray-200"
        style={{ maxWidth: '100%' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="Focal point" className="block max-h-64 w-auto max-w-full" draggable={false} />
        <div
          className="pointer-events-none absolute h-5 w-5 -ml-2.5 -mt-2.5 rounded-full border-2 border-white bg-gold/60 shadow"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      </div>
      <p className="text-xs text-secondary mt-1">
        Click the part of the photo that should stay visible when cropped (list / cover). Current: {value || '50% 50%'}
      </p>
    </div>
  )
}
