'use client'

import { FormattedMessage } from 'react-intl'

interface OkayButtonProps {
  onClick?: () => void
  isSubmit?: boolean
  disabled?: boolean
  isSubmitting?: boolean
}

export function OkayButton({
  onClick,
  isSubmit = false,
  disabled = false,
  isSubmitting = false,
}: OkayButtonProps) {
  return (
    <div className="flex items-center w-full justify-between mt-4 md:mt-6">
      <button
        type={isSubmit ? 'submit' : 'button'}
        onClick={isSubmit ? undefined : onClick}
        className={`bg-black text-white hover:bg-gray-800 transition-all duration-200 ease-out rounded-sm px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium touch-manipulation min-h-[40px] md:min-h-[44px] flex items-center ${
          disabled || isSubmitting
            ? 'opacity-50 cursor-not-allowed hover:bg-black'
            : ''
        }`}
        disabled={disabled || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <FormattedMessage
              id="typeform.submitting"
              defaultMessage="Submitting..."
            />
          </>
        ) : (
          <>
            {isSubmit ? (
              <FormattedMessage
                id="typeform.navigation.submit"
                defaultMessage="Submit"
              />
            ) : (
              <FormattedMessage id="typeform.labels.ok" defaultMessage="OK" />
            )}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </>
        )}
      </button>
      <div className="hidden sm:flex items-center gap-2 text-xs md:text-sm text-gray-500">
        <FormattedMessage id="typeform.pressEnter" defaultMessage="press" />
        <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 border border-gray-200 rounded text-xs font-mono">
          Enter ↵
        </kbd>
      </div>
    </div>
  )
}
