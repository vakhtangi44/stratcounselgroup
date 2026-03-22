import DOMPurify from 'isomorphic-dompurify'

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4',
  'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'hr', 'pre', 'code',
]

const ALLOWED_ATTR = ['href', 'src', 'alt', 'target', 'rel', 'class']

let purify: ReturnType<typeof DOMPurify> | null = null

function getPurify() {
  if (!purify) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { JSDOM } = require('jsdom') as typeof import('jsdom')
    const { window } = new JSDOM('')
    purify = DOMPurify(window as unknown as Window)
  }
  return purify
}

export function sanitizeHtml(dirty: string): string {
  return getPurify().sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORCE_BODY: true,
  })
}
