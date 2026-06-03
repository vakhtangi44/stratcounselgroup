/**
 * Renders a blog video from a stored URL.
 * - YouTube / Vimeo links → privacy-friendly embed iframe (built from the parsed ID, so the src is trusted)
 * - Direct file links (.mp4/.webm/.ogv/.mov) → native <video>
 * - Anything else → a plain link
 */
function youTubeId(url: string): string | null {
  const m =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) ||
    url.match(/youtube\.com\/watch\?.*[?&]v=([\w-]{11})/)
  return m ? m[1] : null
}

function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return m ? m[1] : null
}

export default function VideoEmbed({ url, title }: { url: string | null; title?: string }) {
  if (!url) return null

  const yt = youTubeId(url)
  const vimeo = yt ? null : vimeoId(url)
  const isFile = /\.(mp4|webm|ogv|mov)(\?.*)?$/i.test(url)

  if (yt || vimeo) {
    const src = yt
      ? `https://www.youtube-nocookie.com/embed/${yt}`
      : `https://player.vimeo.com/video/${vimeo}`
    return (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <iframe
          src={src}
          title={title || 'Video'}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (isFile) {
    return (
      <video src={url} controls className="w-full rounded-lg" preload="metadata">
        {title}
      </video>
    )
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-gold underline">
      {title || 'Watch video'}
    </a>
  )
}
