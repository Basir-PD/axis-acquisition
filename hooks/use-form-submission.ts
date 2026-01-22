import { useState, useCallback } from 'react'
import {
  formSubmissionService,
  FormSubmissionError,
  COLLECTION_IDS,
} from '@/lib/form-submission'

interface UseFormSubmissionOptions {
  formType: 'contact' | 'lead' | 'quick-contact'
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function useFormSubmission({
  formType,
  onSuccess,
  onError,
}: UseFormSubmissionOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitForm = useCallback(
    async (data: any) => {
      setIsSubmitting(true)
      setError(null)

      try {
        // Determine collection ID based on form type
        const collectionId =
          formType === 'lead' ? COLLECTION_IDS.LEADS : COLLECTION_IDS.CONTACTS

        await formSubmissionService.submitForm({
          formType,
          collectionId,
          data,
        })

        setIsSuccess(true)
        onSuccess?.()
      } catch (err) {
        const errorMessage =
          err instanceof FormSubmissionError
            ? err.message
            : 'Failed to submit form. Please try again.'

        setError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formType, onSuccess, onError],
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
