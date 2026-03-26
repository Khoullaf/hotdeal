import { NextRequest, NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME_LENGTH = 100
const MAX_SUBJECT_LENGTH = 200
const MAX_MESSAGE_LENGTH = 2000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body as Record<string, string>

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Adresse e-mail invalide' }, { status: 400 })
    }

    if (name.length > MAX_NAME_LENGTH || subject.length > MAX_SUBJECT_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: 'Champ trop long' }, { status: 400 })
    }

    // TODO: integrate an email service (e.g. Resend, SendGrid, Nodemailer) to
    // forward the message to the site owner. Example with Resend:
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@hotdeal.fr',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `[HotDeal Contact] ${subject}`,
    //   text: `De : ${name} <${email}>\n\n${message}`,
    // })

    if (process.env.NODE_ENV !== 'production') {
      console.log('[contact]', { name, email, subject, message })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}
