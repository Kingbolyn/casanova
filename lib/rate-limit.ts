/**
 * In-memory rate limiter for API routes.
 * Limits each IP to MAX_REQUESTS per WINDOW_MS.
 * Suitable for Vercel serverless — resets per cold start, which is acceptable
 * for basic spam protection without an external store.
 */

const WINDOW_MS    = 10 * 60 * 1000  // 10 minutes
const MAX_REQUESTS = 5               // per IP per window

interface Entry {
  count:     number
  windowStart: number
}

// Module-level store survives across requests within the same warm lambda instance
const store = new Map<string, Entry>()

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number }

export function checkRateLimit(ip: string): RateLimitResult {
  const now  = Date.now()
  const entry = store.get(ip)

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    // Fresh window
    store.set(ip, { count: 1, windowStart: now })
    return { allowed: true }
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  entry.count++
  return { allowed: true }
}
