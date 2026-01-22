import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { FormSubmissionEmail } from '@/emails/FormSubmissionEmail'
// import {
//   validateTurnstileToken,
//   isRateLimited,
//   validateHoneypot,
// } from '@/lib/turnstile-validation'

// Temporary replacements while Turnstile is disabled
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isRateLimited = (_clientIP?: string) => false
const validateHoneypot = (value: string) => !value || value.trim() === ''

const resend = new Resend(process.env.NEXT_RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Get client IP for rate limiting
    const clientIP =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Rate limiting check
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 },
      )
    }

    const {
      formType = 'contact',
      name,
      email,
      company,
      message,
      phone,
      budget,
      timeline,
      services,
      projectDetails,
      website, // honeypot field
      ...additionalData
    } = body

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 },
      )
    }

    // Spam protection checks - commented out for now
    // if (!turnstileToken) {
    //   return NextResponse.json(
    //     { error: 'Security verification required' },
    //     { status: 400 },
    //   )
    // }

    // // Validate Turnstile token
    // const isTurnstileValid = await validateTurnstileToken(turnstileToken)
    // if (!isTurnstileValid) {
    //   return NextResponse.json(
    //     { error: 'Security verification failed' },
    //     { status: 400 },
    //   )
    // }

    // Validate honeypot field
    if (!validateHoneypot(website)) {
      console.warn('Honeypot field detected spam submission from IP:', clientIP)
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const submittedAt = new Date().toISOString()

    const { data, error } = await resend.emails.send({
      from: 'Axis Acquisition Forms <onboarding@resend.dev>',
      to: ['bp.payenda@gmail.com'],
      subject: `New ${formType} form submission from ${name}`,
      react: FormSubmissionEmail({
        formType,
        name,
        email,
        company,
        message,
        phone,
        budget,
        timeline,
        services,
        projectDetails,
        submittedAt,
        formData: additionalData,
      }),
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message || error },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
