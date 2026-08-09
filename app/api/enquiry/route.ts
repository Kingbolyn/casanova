import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateEnquiry, sanitize } from '@/lib/validation'
import { checkRateLimit } from '@/lib/rate-limit'
import { enquiryEmailHtml, enquiryEmailText } from '@/lib/email-templates'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'hello@casanova.ng'

const MIN_SUBMIT_MS = 2000

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Rate limit per IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const limit = checkRateLimit(`enquiry:${ip}`)
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait a few minutes before trying again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      }
    )
  }

  // 2. Parse
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request.' },
      { status: 400 }
    )
  }

  const b = body as Record<string, unknown>

  // 3. Honeypot
  if (b._honey && String(b._honey).trim() !== '') {
    return NextResponse.json({ success: true })
  }

  // 4. Minimum time
  const loadedAt = typeof b._loadedAt === 'number' ? b._loadedAt : 0
  if (Date.now() - loadedAt < MIN_SUBMIT_MS) {
    return NextResponse.json({ success: true })
  }

  // 5. Validate
  const result = validateEnquiry(body)
  if (!result.ok) {
    return NextResponse.json(
      { success: false, errors: result.errors },
      { status: 422 }
    )
  }

  // 6. Sanitize
  const name          = sanitize(b.name)
  const email         = sanitize(b.email)
  const phone         = sanitize(b.phone)
  const message       = sanitize(b.message)
  const propertyTitle = sanitize(b.propertyTitle)
  const propertyId    = sanitize(b.propertyId)
  const timestamp     = new Date().toLocaleString('en-NG', {
    timeZone: 'Africa/Lagos',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  // 7. Send
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    await resend.emails.send({
      from:    'CasaNova <contact@casanova.ng>',
      to:      [CONTACT_EMAIL],
      replyTo: email,
      subject: `Enquiry: ${propertyTitle}`,
      html:    enquiryEmailHtml({ name, email, phone, message, propertyTitle, propertyId, timestamp }),
      text:    enquiryEmailText({ name, email, phone, message, propertyTitle, propertyId, timestamp }),
    })
  } catch (err) {
    console.error('[enquiry/route] Resend error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to send your enquiry. Please try again or contact us directly.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ success: true })
}

export function GET(): NextResponse {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
