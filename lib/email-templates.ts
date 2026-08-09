/**
 * HTML email templates for CasaNova transactional mail.
 * Plain-text fallbacks are included for each template.
 * Designed to render correctly in Gmail, Apple Mail, and Outlook.
 */

const BRAND_COLOR  = '#C9A96E'
const DARK_BG      = '#1A1A1A'
const LIGHT_BG     = '#F9F8F6'
const BORDER_COLOR = '#E8E5E1'
const TEXT_PRIMARY = '#1A1A1A'
const TEXT_MUTED   = '#737373'

function wrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:${LIGHT_BG};font-family:'DM Sans',system-ui,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${LIGHT_BG};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px;">

          <!-- Header -->
          <tr>
            <td style="background-color:${DARK_BG};padding:28px 36px;border-bottom:2px solid ${BRAND_COLOR};">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:300;letter-spacing:-0.02em;color:#FFFFFF;">
                CasaNova
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#FFFFFF;padding:36px;border:1px solid ${BORDER_COLOR};border-top:none;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;">
              <p style="margin:0;font-size:12px;color:${TEXT_MUTED};line-height:1.6;">
                This message was sent via the CasaNova website. Do not reply to this email — contact the enquirer directly using the details above.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function row(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid ${BORDER_COLOR};vertical-align:top;width:140px;">
      <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${TEXT_MUTED};">${label}</p>
    </td>
    <td style="padding:10px 0 10px 16px;border-bottom:1px solid ${BORDER_COLOR};vertical-align:top;">
      <p style="margin:0;font-size:14px;color:${TEXT_PRIMARY};line-height:1.5;">${value}</p>
    </td>
  </tr>`
}

// ─── Contact email ────────────────────────────────────────────────────────────

export interface ContactEmailData {
  name:      string
  email:     string
  subject:   string
  message:   string
  timestamp: string
}

export function contactEmailHtml(d: ContactEmailData): string {
  const body = `
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND_COLOR};">
      New Contact Request
    </p>
    <h1 style="margin:0 0 28px;font-family:Georgia,serif;font-size:24px;font-weight:300;color:${TEXT_PRIMARY};">
      ${d.subject}
    </h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Name',      d.name)}
      ${row('Email',     `<a href="mailto:${d.email}" style="color:${BRAND_COLOR};text-decoration:none;">${d.email}</a>`)}
      ${row('Message',   d.message.replace(/\n/g, '<br />'))}
      ${row('Received',  d.timestamp)}
    </table>
    <div style="margin-top:28px;">
      <a href="mailto:${d.email}?subject=Re: ${encodeURIComponent(d.subject)}"
         style="display:inline-block;background-color:${DARK_BG};color:#FFFFFF;text-decoration:none;font-size:13px;letter-spacing:0.06em;padding:12px 24px;border:1px solid ${BRAND_COLOR};">
        Reply to ${d.name}
      </a>
    </div>`

  return wrapper(`New Contact Request — ${d.subject}`, body)
}

export function contactEmailText(d: ContactEmailData): string {
  return [
    'NEW CONTACT REQUEST — CasaNova',
    '',
    `Name:      ${d.name}`,
    `Email:     ${d.email}`,
    `Subject:   ${d.subject}`,
    '',
    'Message:',
    d.message,
    '',
    `Received:  ${d.timestamp}`,
  ].join('\n')
}

// ─── Enquiry email ────────────────────────────────────────────────────────────

export interface EnquiryEmailData {
  name:          string
  email:         string
  phone:         string
  message:       string
  propertyTitle: string
  propertyId:    string
  timestamp:     string
}

export function enquiryEmailHtml(d: EnquiryEmailData): string {
  const body = `
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND_COLOR};">
      New Property Enquiry
    </p>
    <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;font-weight:300;color:${TEXT_PRIMARY};">
      ${d.propertyTitle}
    </h1>
    <p style="margin:0 0 28px;font-size:13px;color:${TEXT_MUTED};">Property ID: ${d.propertyId}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Name',     d.name)}
      ${row('Email',    `<a href="mailto:${d.email}" style="color:${BRAND_COLOR};text-decoration:none;">${d.email}</a>`)}
      ${row('Phone',    d.phone || '—')}
      ${row('Message',  d.message ? d.message.replace(/\n/g, '<br />') : 'No message provided.')}
      ${row('Received', d.timestamp)}
    </table>
    <div style="margin-top:28px;">
      <a href="mailto:${d.email}?subject=Re: Your enquiry about ${encodeURIComponent(d.propertyTitle)}"
         style="display:inline-block;background-color:${DARK_BG};color:#FFFFFF;text-decoration:none;font-size:13px;letter-spacing:0.06em;padding:12px 24px;border:1px solid ${BRAND_COLOR};">
        Reply to ${d.name}
      </a>
    </div>`

  return wrapper(`New Enquiry — ${d.propertyTitle}`, body)
}

export function enquiryEmailText(d: EnquiryEmailData): string {
  return [
    'NEW PROPERTY ENQUIRY — CasaNova',
    '',
    `Property:  ${d.propertyTitle}`,
    `ID:        ${d.propertyId}`,
    '',
    `Name:      ${d.name}`,
    `Email:     ${d.email}`,
    `Phone:     ${d.phone || '—'}`,
    '',
    'Message:',
    d.message || 'No message provided.',
    '',
    `Received:  ${d.timestamp}`,
  ].join('\n')
}
