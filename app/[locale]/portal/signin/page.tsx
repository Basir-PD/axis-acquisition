'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import {
  AuthLayout,
  FormInput,
  PasswordInput,
  SubmitButton,
  AuthError,
} from '@/components/portal/auth'

export default function SignInPage() {
  const { signIn, loading: authLoading, user } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/portal')
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await signIn(email, password)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Sign in failed. Please check your credentials.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearError = () => {
    if (error) setError(null)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your client portal"
    >
      {/* Error Display */}
      {error && (
        <div className="mb-6">
          <AuthError message={error} />
        </div>
      )}

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          icon={Mail}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            clearError()
          }}
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            clearError()
          }}
          required
        />

        {/* Submit Button */}
        <div className="pt-2">
          <SubmitButton
            isLoading={isSubmitting}
            loadingText="Signing in..."
            disabled={authLoading || !email || !password}
          >
            Sign In
            <ArrowRight className="w-5 h-5" />
          </SubmitButton>
        </div>
      </form>

      {/* Sign Up Link */}
      <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/portal/signup"
          className="font-semibold text-neutral-900 dark:text-white hover:underline"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}
