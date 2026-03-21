import { createClient } from '@supabase/supabase-js'
import { Redis } from '@upstash/redis'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const ipRequestLog = new Map()

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for']
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim()
  }
  return 'unknown'
}

function cleanExpiredRequests(now) {
  for (const [ip, entry] of ipRequestLog.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      ipRequestLog.delete(ip)
    }
  }
}

function checkRateLimit(ip) {
  const now = Date.now()
  cleanExpiredRequests(now)

  const existing = ipRequestLog.get(ip)
  if (!existing || now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipRequestLog.set(ip, { count: 1, windowStart: now })
    return { allowed: true, retryAfterMs: 0 }
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - existing.windowStart)
    return { allowed: false, retryAfterMs }
  }

  existing.count += 1
  ipRequestLog.set(ip, existing)
  return { allowed: true, retryAfterMs: 0 }
}

async function checkRateLimitWithRedis(ip) {
  if (!redis) return null

  const key = `rate:contact:${ip}`
  const requests = await redis.incr(key)
  if (requests === 1) {
    await redis.pexpire(key, RATE_LIMIT_WINDOW_MS)
  }

  if (requests > RATE_LIMIT_MAX_REQUESTS) {
    const ttlMs = await redis.pttl(key)
    return {
      allowed: false,
      retryAfterMs: Math.max(ttlMs, 1000),
    }
  }

  return { allowed: true, retryAfterMs: 0 }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function badRequest(res, message) {
  return res.status(400).json({ ok: false, message })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' })
  }

  const ip = getClientIp(req)
  let limit = null
  try {
    limit = await checkRateLimitWithRedis(ip)
  } catch {
    limit = null
  }

  if (!limit) {
    limit = checkRateLimit(ip)
  }

  if (!limit.allowed) {
    res.setHeader('Retry-After', Math.ceil(limit.retryAfterMs / 1000))
    return res.status(429).json({
      ok: false,
      message: 'Too many requests. Please try again later.',
    })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      ok: false,
      message: 'Server is not configured for submissions.',
    })
  }

  const { name, email, message, website } = req.body || {}

  // Honeypot field should stay empty for real users.
  if (typeof website === 'string' && website.trim() !== '') {
    return res.status(200).json({ ok: true })
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
    return badRequest(res, 'Please provide a valid name.')
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email.trim()) || email.trim().length > 120) {
    return badRequest(res, 'Please provide a valid email address.')
  }

  if (!message || typeof message !== 'string' || message.trim().length < 8 || message.trim().length > 2000) {
    return badRequest(res, 'Please provide a valid message.')
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    })

    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          source: 'portfolio_site',
          ip,
        },
      ])

    if (error) {
      return res.status(500).json({ ok: false, message: 'Could not save your message.' })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ ok: false, message: 'Unexpected server error.' })
  }
}
