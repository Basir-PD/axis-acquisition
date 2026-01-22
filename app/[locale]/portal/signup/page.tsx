'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Building2, Phone, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import {
  AuthLayout,
  FormInput,
  PasswordInput,
  SubmitButton,
  AuthError,
} from '@/components/portal/auth'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  company: string
  phone: string
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  company: '',
  phone: '',
}

export default function SignUpPage() {
  const { signUp, loading: authLoading, user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/portal')
    }
  }, [user, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const validateForm = (): string | null => {
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match'
    }
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        company: formData.company || undefined,
        phone: formData.phone || undefined,
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Sign up failed. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing your projects today"
    >
      {/* Error Display */}
      {error && (
        <div className="mb-6">
          <AuthError message={error} />
        </div>
      )}

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Full Name"
          icon={User}
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          icon={Mail}
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <FormInput
          id="company"
          name="company"
          type="text"
          label="Company"
          icon={Building2}
          placeholder="Your Company"
          value={formData.company}
          onChange={handleChange}
          optional
        />

        <FormInput
          id="phone"
          name="phone"
          type="tel"
          label="Phone"
          icon={Phone}
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleChange}
          optional
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Min. 8 characters"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <div className="pt-4">
          <SubmitButton
            isLoading={isSubmitting}
            loadingText="Creating account..."
            disabled={authLoading}
          >
            Create Account
            <ArrowRight className="w-5 h-5" />
          </SubmitButton>
        </div>
      </form>

      {/* Sign In Link */}
      <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
        Already have an account?{' '}
        <Link
          href="/portal/signin"
          className="font-semibold text-neutral-900 dark:text-white hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
