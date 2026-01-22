'use client'

import { Loader2 } from 'lucide-react'

interface SubmitButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  loadingText?: string
  disabled?: boolean
}

export default function SubmitButton({
  children,
  isLoading = false,
  loadingText = 'Please wait...',
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className="
        w-full py-4 px-6
        bg-neutral-900 dark:bg-white
        text-white dark:text-neutral-900
        font-semibold text-base
        rounded-xl
        transition-all duration-200
        hover:bg-neutral-800 dark:hover:bg-neutral-100
        focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]
        flex items-center justify-center gap-2
      "
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}
