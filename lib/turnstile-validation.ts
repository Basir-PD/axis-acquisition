interface TurnstileValidationResponse {
  success: boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?: string
}

export async function validateTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not set')
    return false
  }

  if (!token) {
    console.error('No Turnstile token provided')
    return false
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      },
    )

    if (!response.ok) {
      console.error('Failed to validate Turnstile token:', response.status)
      return false
    }

    const data: TurnstileValidationResponse = await response.json()

    if (!data.success) {
      console.error('Turnstile validation failed:', data['error-codes'])
      return false
    }

    return true
  } catch (error) {
    console.error('Error validating Turnstile token:', error)
    return false
  }
}

// Rate limiting utility (simple in-memory store for demo)
const submissionTracker = new Map<string, number[]>()

export function isRateLimited(
  ip: string,
  maxSubmissions = 3,
  timeWindowMs = 3600000,
): boolean {
  const now = Date.now()
  const submissions = submissionTracker.get(ip) || []

  // Remove submissions older than the time window
  const recentSubmissions = submissions.filter(
    (timestamp) => now - timestamp < timeWindowMs,
  )

  // Update the tracker
  submissionTracker.set(ip, recentSubmissions)

  // Check if rate limit exceeded
  if (recentSubmissions.length >= maxSubmissions) {
    return true
  }

  // Add current submission
  recentSubmissions.push(now)
  submissionTracker.set(ip, recentSubmissions)

  return false
}

// Validate honeypot field
export function validateHoneypot(honeypotValue: string): boolean {
  // Honeypot field should always be empty for legitimate users
  return !honeypotValue || honeypotValue.trim() === ''
}
