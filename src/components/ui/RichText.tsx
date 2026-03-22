/**
 * Renders admin-managed text that may contain inline HTML formatting (bold, italic, colors).
 *
 * SECURITY NOTE: Content is TRUSTED — only authenticated admins can edit these values
 * via the password-protected /admin/settings panel. This is NOT user-generated content.
 * The admin panel uses contentEditable for rich text editing, producing safe inline
 * HTML tags like <b>, <i>, <u>, <span style="color:...">.
 */
export default function RichText({
  html,
  as: Tag = 'span',
  className = '',
  style,
}: {
  html: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'
  className?: string
  style?: React.CSSProperties
}) {
  // If no HTML tags present, render as plain text for performance
  if (!/<[a-z][\s\S]*>/i.test(html)) {
    return <Tag className={className} style={style}>{html}</Tag>
  }

  // Content sourced from admin-controlled database (SiteSetting table)
  return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />
}
