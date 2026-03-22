const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4',
  'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'hr', 'pre', 'code',
])

const ALLOWED_ATTR = new Set(['href', 'src', 'alt', 'target', 'rel', 'class'])

export function sanitizeHtml(dirty: string): string {
  // Remove script/style blocks first
  let clean = dirty
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')

  // Strip all tags except allowed ones, filter attributes
  clean = clean.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/gi, (match, tag) => {
    const lowerTag = tag.toLowerCase()
    if (!ALLOWED_TAGS.has(lowerTag)) return ''

    // For closing tags, return clean closing tag
    if (match.startsWith('</')) return `</${lowerTag}>`

    // For opening tags, filter attributes
    const attrString = match.slice(match.indexOf(tag) + tag.length, match.endsWith('/>') ? -2 : -1)
    const cleanAttrs: string[] = []

    const attrRegex = /([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
    let attrMatch
    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      const attrName = attrMatch[1].toLowerCase()
      const attrValue = attrMatch[2] ?? attrMatch[3] ?? ''

      if (!ALLOWED_ATTR.has(attrName)) continue

      // Block dangerous URLs
      if ((attrName === 'href' || attrName === 'src') && attrValue.trim().toLowerCase().startsWith('javascript:')) continue

      cleanAttrs.push(`${attrName}="${attrValue}"`)
    }

    const attrs = cleanAttrs.length > 0 ? ' ' + cleanAttrs.join(' ') : ''
    const selfClose = match.endsWith('/>') ? ' /' : ''
    return `<${lowerTag}${attrs}${selfClose}>`
  })

  return clean
}
