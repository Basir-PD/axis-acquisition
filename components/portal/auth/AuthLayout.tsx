'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import BenefitsSidebar from './BenefitsSidebar'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Benefits */}
      <BenefitsSidebar />

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-white dark:bg-neutral-950">
        {/* Header with Back Button */}
        <header className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to website
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            {/* Title Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                {title}
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                {subtitle}
              </p>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-xs text-neutral-400">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-neutral-600">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-neutral-600">
              Privacy Policy
            </Link>
          </p>
        </footer>
      </div>
    </div>
  )
}
