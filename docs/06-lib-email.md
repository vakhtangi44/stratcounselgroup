# 06 — Email

**File:** `src/lib/email.ts`

Handles all outgoing emails using Nodemailer with Gmail as the sending service.

---

## Full File with Line-by-Line Explanation

```typescript
import nodemailer from 'nodemailer'
```
- Nodemailer is the standard Node.js email library
- It supports dozens of email services and SMTP servers
- Here we use Gmail as the transport

---

```typescript
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})
```
- `createTransport` creates a reusable email sender configured for Gmail
- `service: 'gmail'` — Nodemailer has built-in presets for popular email services. This sets the correct SMTP host/port/TLS for Gmail automatically.
- `user` — the Gmail address that sends the emails (e.g., `info@stratcounselgroup.com`)
- `pass` — a **Gmail App Password**, NOT the account's regular password
  - App Passwords are 16-character codes generated in Google Account settings
  - They exist because Gmail blocks regular password login from apps (2FA requirement)
  - App Passwords only work if 2-Step Verification is enabled on the Google account
- The transporter is exported so it could be used directly, but in practice the two helper functions below are used instead

---

## Function: sendContactEmail

```typescript
export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
```
- Takes a typed object with the contact form data
- `phone?` — optional (the `?` means the caller can omit it)

```typescript
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
```
- The "From" address — must be the authenticated Gmail address
- Gmail will reject emails with a `from` that doesn't match the authenticated account

```typescript
    to: process.env.GMAIL_USER,
```
- The email is sent TO the same Gmail address (the firm's inbox)
- The firm staff will see contact form submissions in their Gmail

```typescript
    replyTo: data.email,
```
- Critical UX detail: sets the Reply-To header to the visitor's email
- When staff clicks "Reply" in Gmail, it goes to the visitor — not back to themselves

```typescript
    subject: `Strategic Counsel Group Contact: ${data.subject}`,
```
- Subject prefix makes it easy to filter/search contact emails in Gmail

```typescript
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr />
      <p>${data.message.replace(/\n/g, '<br />')}</p>
    `,
  })
}
```
- Sends HTML email — looks better in Gmail than plain text
- `data.message.replace(/\n/g, '<br />')` — converts newlines to HTML line breaks so the message formatting is preserved
- ⚠️ **Security note:** `data.name`, `data.email`, etc. are interpolated directly into HTML. This is safe here because the email is only sent TO the admin (not displayed on the public website), but in a public context this would need HTML escaping.

---

## Function: sendNewsletterEmail

```typescript
export async function sendNewsletterEmail(data: {
  to: string
  subjectKa: string
  subjectEn: string
  bodyKa: string
  bodyEn: string
  unsubscribeToken: string
}) {
```
- Takes bilingual subject and body — the same email contains both languages

```typescript
  const unsubscribeUrl = `${process.env.NEXTAUTH_URL}/newsletter/unsubscribe?token=${data.unsubscribeToken}`
```
- Constructs the unsubscribe link using the subscriber's unique token
- `NEXTAUTH_URL` is the site's base URL (e.g., `https://stratcounselgroup.com`)
- The token is a UUID — impossible to guess, unique per subscriber
- When clicked: `GET /[locale]/newsletter/unsubscribe?token=abc123` → subscriber's `active` set to `false`

```typescript
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: data.to,
    subject: `${data.subjectKa} | ${data.subjectEn}`,
```
- Subject contains both languages separated by ` | `
- Subscribers see both — regardless of their language preference

```typescript
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif">
        <div style="margin-bottom:32px">${data.bodyKa}</div>
        <hr style="margin:32px 0" />
        <div style="margin-bottom:32px">${data.bodyEn}</div>
        <hr style="margin:32px 0" />
        <p style="font-size:12px;color:#999">
          <a href="${unsubscribeUrl}">Unsubscribe / გამოწერის გაუქმება</a>
        </p>
      </div>
    `,
  })
}
```
- Inline styles are used because many email clients (Gmail, Outlook) strip `<style>` tags
- `max-width:600px` — standard newsletter width that renders well on all clients
- `font-family:Georgia,serif` — matches the site's editorial feel
- Georgian body first, then English, separated by `<hr>`
- Unsubscribe link at the bottom in both languages — required by email law (CAN-SPAM, GDPR)
- `font-size:12px;color:#999` — small and grey so it's present but unobtrusive

---

## How Email Sending Works in Practice

### Contact Form Flow
```
Visitor submits form
  → POST /api/contact
  → Verifies Turnstile CAPTCHA
  → Saves ContactMessage to DB
  → sendContactEmail()   ← sends notification to admin
  → Returns { ok: true }
```

Note: the contact form submission is saved to the DB *regardless* of whether the email succeeds. This means if Gmail is down, the message is not lost — the admin can check the Messages section in the admin panel.

### Newsletter Broadcast Flow
```
Admin clicks "Send" in newsletter manager
  → POST /api/admin/newsletter/send
  → Fetches all active subscribers
  → Loops through them, calls sendNewsletterEmail() for each
  → Failed sends are silently skipped (try/catch)
  → Returns { ok: true, sent: 45, total: 47 }
```

Individual send failures don't abort the broadcast — if one subscriber's email bounces, the others still receive it.
