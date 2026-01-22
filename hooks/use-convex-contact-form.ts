'use client'

import { useMutation } from 'convex/react'
import { useCallback, useState } from 'react'
import { api } from '@/convex/_generated/api'

interface ContactFormData {
  name: string
  email: string
  phoneNumber?: string
  package?: string
  message: string
  source?: string
}

interface UseConvexContactFormOptions {
  source?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function useConvexContactForm({
  source = 'contact-page',
  onSuccess,
  onError,
}: UseConvexContactFormOptions = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createContact = useMutation(api.contacts.create)

  const submitForm = useCallback(
    async (data: ContactFormData) => {
      setIsSubmitting(true)
      setError(null)

      try {
        await createContact({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          package: data.package,
          message: data.message,
          source,
        })

        setIsSuccess(true)
        onSuccess?.()
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to submit form. Please try again.'

        setError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setIsSubmitting(false)
      }
    },
    [createContact, source, onSuccess, onError],
  )

  const reset = useCallback(() => {
    setIsSubmitting(false)
    setIsSuccess(false)
    setError(null)
  }, [])

  return {
    submitForm,
    isSubmitting,
    isSuccess,
    error,
    reset,
  }
}
