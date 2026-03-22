'use client'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4">
      <p className="text-secondary">Something went wrong loading this page.</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-gold text-white rounded text-sm hover:bg-gold-dark transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
