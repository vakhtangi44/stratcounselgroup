import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    replyTo: data.email,
    subject: `Strategic Counsel Group Contact: ${data.subject}`,
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

export async function sendNewsletterEmail(data: {
  to: string
  subjectKa: string
  subjectEn: string
  bodyKa: string
  bodyEn: string
  unsubscribeToken: string
}) {
  const unsubscribeUrl = `${process.env.NEXTAUTH_URL}/newsletter/unsubscribe?token=${data.unsubscribeToken}`
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: data.to,
    subject: `${data.subjectKa} | ${data.subjectEn}`,
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
