'use client'

import { AlertCircle } from 'lucide-react'

interface AuthErrorProps {
  message: string
  showContactLink?: boolean
}

export default function AuthError({
  message,
  showContactLink = false,
}: AuthErrorProps) {
  const isRateLimited =
    message.toLowerCase().includes('too many') ||
    message.includes('429') ||
    message.toLowerCase().includes('rate')

  return (
    <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-red-700 dark:text-red-400">
          <p className="font-medium">{message}</p>
          {(isRateLimited || showContactLink) && (
            <p className="mt-2">
              Having trouble?{' '}
              <a
                href="mailto:contact@webapplica.com"
                className="underline font-medium hover:text-red-800 dark:hover:text-red-300"
              >
                Contact us via email
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
