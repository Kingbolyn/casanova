/**
 * Shared validation utilities for API routes.
 * All validation runs server-side only — never expose these in client bundles.
 */

export type ValidationError = { field: string; message: string }
export type ValidationResult = { ok: true } | { ok: false; errors: ValidationError[] }

const EMAIL_RE   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MAX_MSG    = 2000   // characters
const MAX_NAME   = 120
const MAX_PHONE  = 30
const MAX_SUBJ   = 200

/** Strip HTML tags and trim whitespace */
export function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.replace(/<[^>]*>/g, '').trim()
}

/** Validate a contact form payload */
export function validateContact(body: unknown): ValidationResult {
  const errors: ValidationError[] = []

  if (typeof body !== 'object' || body === null) {
    return { ok: false, errors: [{ field: 'body', message: 'Invalid request body.' }] }
  }

  const b = body as Record<string, unknown>

  const name    = sanitize(b.name)
  const email   = sanitize(b.email)
  const subject = sanitize(b.subject)
  const message = sanitize(b.message)

  if (!name)                     errors.push({ field: 'name',    message: 'Name is required.' })
  if (name.length > MAX_NAME)    errors.push({ field: 'name',    message: 'Name is too long.' })

  if (!email)                    errors.push({ field: 'email',   message: 'Email address is required.' })
  else if (!EMAIL_RE.test(email)) errors.push({ field: 'email',  message: 'Please enter a valid email address.' })

  if (!subject)                  errors.push({ field: 'subject', message: 'Subject is required.' })
  if (subject.length > MAX_SUBJ) errors.push({ field: 'subject', message: 'Subject is too long.' })

  if (!message)                  errors.push({ field: 'message', message: 'Message is required.' })
  if (message.length > MAX_MSG)  errors.push({ field: 'message', message: `Message must be under ${MAX_MSG} characters.` })

  return errors.length ? { ok: false, errors } : { ok: true }
}

/** Validate a property enquiry payload */
export function validateEnquiry(body: unknown): ValidationResult {
  const errors: ValidationError[] = []

  if (typeof body !== 'object' || body === null) {
    return { ok: false, errors: [{ field: 'body', message: 'Invalid request body.' }] }
  }

  const b = body as Record<string, unknown>

  const name          = sanitize(b.name)
  const email         = sanitize(b.email)
  const phone         = sanitize(b.phone)
  const message       = sanitize(b.message)
  const propertyTitle = sanitize(b.propertyTitle)
  const propertyId    = sanitize(b.propertyId)

  if (!name)                      errors.push({ field: 'name',    message: 'Name is required.' })
  if (name.length > MAX_NAME)     errors.push({ field: 'name',    message: 'Name is too long.' })

  if (!email)                     errors.push({ field: 'email',   message: 'Email address is required.' })
  else if (!EMAIL_RE.test(email)) errors.push({ field: 'email',   message: 'Please enter a valid email address.' })

  if (phone && phone.length > MAX_PHONE) errors.push({ field: 'phone', message: 'Phone number is too long.' })

  if (message.length > MAX_MSG)   errors.push({ field: 'message', message: `Message must be under ${MAX_MSG} characters.` })

  if (!propertyTitle)             errors.push({ field: 'propertyTitle', message: 'Property reference is missing.' })
  if (!propertyId)                errors.push({ field: 'propertyId',    message: 'Property ID is missing.' })

  return errors.length ? { ok: false, errors } : { ok: true }
}
