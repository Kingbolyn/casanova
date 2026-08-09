import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateContact, sanitize } from '@/lib/validation'
import { checkRateLimit } from '@/lib/rate-limit'
import { contactEmailHtml, contactEmailText } from '@/lib/email-templates'

// Instantiate inside the handler so build-time page collection does not
// attempt to validate the API key before .env.local is available.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'hello@casanova.ng'

// ─── Honeypot + minimum time checks ──────────────────────────────────────────

const MIN_SUBMIT_MS = 2000  // reject submissions faster than 2 seconds

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Identify client IP for rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  // 2. Rate limit
  const limit = checkRateLimit(`contact:${ip}`)
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait a few minutes before trying again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      }
    )
  }

  // 3. Parse body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request.' },
      { status: 400 }
    )
  }

  // 4. Honeypot — bots fill hidden fields, humans leave them empty
  const b = body as Record<string, unknown>
  if (b._honey && String(b._honey).trim() !== '') {
    // Silent accept — don't reveal honeypot to bots
    return NextResponse.json({ success: true })
  }

  // 5. Minimum submission time — reject suspiciously fast submissions
  const loadedAt = typeof b._loadedAt === 'number' ? b._loadedAt : 0
  if (Date.now() - loadedAt < MIN_SUBMIT_MS) {
    return NextResponse.json({ success: true })  // silent accept
  }

  // 6. Validate
  const result = validateContact(body)
  if (!result.ok) {
    return NextResponse.json(
      { success: false, errors: result.errors },
      { status: 422 }
    )
  }

  // 7. Sanitize fields for use in email
  const name    = sanitize(b.name)
  const email   = sanitize(b.email)
  const subject = sanitize(b.subject)
  const message = sanitize(b.message)
  const timestamp = new Date().toLocaleString('en-NG', {
    timeZone: 'Africa/Lagos',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  // 8. Send via Resend
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    await resend.emails.send({
      from:     'CasaNova <contact@casanova.ng>',
      to:       [CONTACT_EMAIL],
      replyTo:  email,
      subject:  `Contact: ${subject}`,
      html:     contactEmailHtml({ name, email, subject, message, timestamp }),
      text:     contactEmailText({ name, email, subject, message, timestamp }),
    })
  } catch (err) {
    console.error('[contact/route] Resend error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to send your message. Please try again or email us directly.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ success: true })
}

// Reject all other methods
export function GET(): NextResponse {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
