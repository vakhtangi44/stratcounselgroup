import DOMPurify from 'isomorphic-dompurify'
import { JSDOM } from 'jsdom'

type WindowLike = Pick<
  typeof globalThis,
  'NodeFilter' | 'Node' | 'Element' | 'HTMLTemplateElement' | 'DocumentFragment' | 'HTMLFormElement' | 'DOMParser' | 'NamedNodeMap'
>

const { window } = new JSDOM('')
const purify = DOMPurify(window as unknown as WindowLike)

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4',
  'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'hr', 'pre', 'code',
]

const ALLOWED_ATTR = ['href', 'src', 'alt', 'target', 'rel', 'class']

export function sanitizeHtml(dirty: string): string {
  return purify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORCE_BODY: true,
  })
}
