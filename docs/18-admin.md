# 18 — Admin Panel

The admin panel (`/admin`) is a bespoke CMS (Content Management System) for managing all site content. It's protected by NextAuth authentication.

---

## Login Page — `src/app/admin/login/page.tsx`

```typescript
'use client'  // must be client component — uses state and event handlers

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
```
- `router` — used to navigate to `/admin` after successful login
- `error` — stores the error message to display to the user
- `loading` — disables the button while the request is in flight

```typescript
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()  // prevent default form submission (page reload)
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: false,  // don't redirect automatically — handle it ourselves
    })
```
- `FormData` — reads the form field values without needing controlled inputs
- `signIn('credentials', ...)` — calls NextAuth's sign-in with the `Credentials` provider
- `redirect: false` — allows us to handle success/failure manually instead of NextAuth's default redirect

```typescript
    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }
```
- If NextAuth returns an error (wrong password, user not found), show the error message
- On success, navigate to the admin dashboard
- Note: the error message is generic ("Invalid email or password") — doesn't tell an attacker whether the email exists

---

## Dashboard — `src/app/admin/(protected)/page.tsx`

```typescript
const [posts, team, messages, subscribers] = await Promise.all([
  db.blogPost.count(),
  db.teamMember.count({ where: { active: true } }),
  db.contactMessage.count({ where: { read: false } }),  // unread messages
  db.newsletterSubscriber.count({ where: { active: true } }),
])
```
- Four counter queries in parallel
- `{ read: false }` — only counts unread messages for the notification badge

Renders a 2×4 grid of stat cards showing current counts.

---

## AdminSidebar — `src/components/admin/AdminSidebar.tsx`

```typescript
'use client'  // needs usePathname for active link highlighting

const sections = [
  { label: 'Content', links: [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/blog', label: 'Blog Posts' },
    // ...
  ]},
  { label: 'Site Management', links: [ ... ] },
  { label: 'Communication', links: [ ... ] },
]
```
- Navigation is split into three semantic sections
- Static configuration (not from DB) — changing the nav requires a code change

```typescript
const pathname = usePathname()

className={cn(
  'block px-3 py-2 rounded text-sm transition-colors',
  pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
    ? 'bg-gold text-white'
    : 'text-white/70 hover:text-white hover:bg-white/10'
)}
```
- Active link detection:
  - Exact match for the dashboard (`/admin`)
  - Prefix match for sub-pages (`/admin/blog` matches `/admin/blog/new`)
  - Special case for `/admin`: exact match only (otherwise it would highlight for every admin page)

```typescript
<button onClick={() => signOut({ callbackUrl: '/admin/login' })}>
  Sign Out
</button>
```
- `signOut` from next-auth/react — clears the session cookie
- `callbackUrl` — where to go after sign-out

---

## RichTextEditor — `src/components/admin/RichTextEditor.tsx`

TipTap rich text editor used for blog post content fields.

```typescript
'use client'

const editor = useEditor({
  extensions: [StarterKit],
  content: value,
  onUpdate: ({ editor }) => onChange(editor.getHTML()),
})
```
- `useEditor` — TipTap's React hook, creates and manages the editor instance
- `StarterKit` — a bundle of common extensions: bold, italic, headings, lists, blockquote, code, etc.
- `content: value` — initial HTML content from the parent
- `onUpdate` — fires whenever the content changes; calls `onChange` with the new HTML string

```typescript
useEffect(() => {
  if (editor && value !== editor.getHTML()) {
    editor.commands.setContent(value)
  }
}, [value, editor])
```
- Syncs external `value` prop changes into the editor
- Guards with `value !== editor.getHTML()` to avoid infinite update loop
- Needed when a form is reset or when switching between Ka/En fields

```typescript
if (!editor) return null
```
- TipTap initializes asynchronously — returns `null` on the first render
- Prevents rendering an empty shell while the editor is loading

**Toolbar buttons:**
```typescript
{ label: 'B',  action: () => editor.chain().focus().toggleBold().run(),            active: editor.isActive('bold') },
{ label: 'I',  action: () => editor.chain().focus().toggleItalic().run(),          active: editor.isActive('italic') },
{ label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
{ label: 'UL', action: () => editor.chain().focus().toggleBulletList().run(),       active: editor.isActive('bulletList') },
{ label: 'OL', action: () => editor.chain().focus().toggleOrderedList().run(),      active: editor.isActive('orderedList') },
```
- `editor.chain().focus()` — starts a command chain and focuses the editor
- `.toggleX().run()` — executes the command (toggle on/off)
- `editor.isActive(...)` — returns true if the cursor is inside that formatting — used to highlight the active button

---

## Blog Form — `src/app/admin/(protected)/blog/BlogForm.tsx`

The most complex admin form — creates and edits blog posts.

**Key features:**
- Bilingual fields (Ka/En) for title, excerpt, and content
- `RichTextEditor` for the HTML content fields
- `ImageUpload` for the cover image
- Practice area tag checkboxes (selects from `PRACTICE_AREAS` constant)
- Author dropdown (fetches from `GET /api/admin/team`)
- Status toggle (draft / published)

**Submit logic:**
```typescript
const method = id ? 'PUT' : 'POST'
const url = id ? `/api/admin/blog/${id}` : '/api/admin/blog'
const res = await fetch(url, {
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
```
- Same form component used for both create (POST) and edit (PUT)
- The `id` prop determines which method and URL to use

---

## Settings Editor — `src/app/admin/(protected)/settings/SettingsEditor.tsx`

```typescript
// Load settings grouped by category
const grouped = await fetch('/api/admin/settings').then(r => r.json())

// Render tabs for each category
Object.entries(grouped).map(([category, settings]) => (
  <Tab label={category}>
    {settings.map(setting => (
      <div key={setting.key}>
        <label>{setting.key}</label>
        <input value={setting.valueKa} onChange={...} placeholder="Georgian" />
        <input value={setting.valueEn} onChange={...} placeholder="English" />
      </div>
    ))}
  </Tab>
))

// Save all changes
await fetch('/api/admin/settings', {
  method: 'PUT',
  body: JSON.stringify(changedSettings),
})
```
- The `key` is read-only — only the values are editable
- Changes are batched: all modifications are sent in one PUT request

---

## Newsletter Manager — `src/app/admin/(protected)/newsletter/NewsletterManager.tsx`

**Key features:**
- Subscriber count display
- Export subscriber list to CSV
- Compose bilingual newsletter (Ka + En subject and body)
- Preview mode (sends to admin only)
- Broadcast to all active subscribers

```typescript
// CSV export
const csv = subscribers.map(s => `${s.email},${s.subscribedAt}`).join('\n')
const blob = new Blob([csv], { type: 'text/csv' })
const url = URL.createObjectURL(blob)
// trigger download
```

---

## Messages Table — `src/app/admin/(protected)/messages/MessagesTable.tsx`

- Shows all contact form submissions
- Unread messages highlighted
- Click to mark as read (`PATCH /api/admin/messages`)
- Delete button (`DELETE /api/admin/messages/[id]`)
- Reply button opens Gmail compose with `mailto:` link

---

## Admin Pattern: Page → Client Component

Most admin pages follow this pattern:

```
/admin/blog/page.tsx (Server Component)
  → fetches initial data from DB
  → passes to BlogList.tsx or renders inline

/admin/blog/new/page.tsx (Server Component)
  → fetches team members for author dropdown
  → renders <BlogForm teamMembers={teamMembers} />

/admin/blog/[id]/edit/page.tsx (Server Component)
  → fetches the specific post
  → renders <BlogForm post={post} teamMembers={teamMembers} />
```

The form components (`BlogForm`, `FaqForm`, `TestimonialForm`, etc.) are all Client Components because they manage form state.
