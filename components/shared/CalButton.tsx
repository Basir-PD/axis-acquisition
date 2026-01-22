'use client'

import { Calendar } from 'lucide-react'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from '@/components/shared/button'

interface CalButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  calLink?: string
  showIcon?: boolean
}

export function CalButton({
  variant = 'primary',
  size = 'md',
  className = '',
  calLink = 'webapplica/30min',
  showIcon = true,
}: CalButtonProps) {
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://app.cal.com/embed/embed.js"]',
    )

    if (!existingScript) {
      // Load Cal.com embed script only once
      const script = document.createElement('script')
      script.src = 'https://app.cal.com/embed/embed.js'
      script.async = true
      script.id = 'cal-embed-script'
      document.head.appendChild(script)
    }

    // Don't remove the script on unmount as other components might need it
  }, [])

  const handleClick = () => {
    // Open Cal.com booking modal
    if (typeof window !== 'undefined' && (window as any).Cal) {
      try {
        const cal = (window as any).Cal
        cal('ui', {
          styles: {
            branding: {
              brandColor: '#000000',
            },
          },
          hideEventTypeDetails: false,
        })
        cal('floatingButton', {
          calLink: calLink,
          buttonText: 'Schedule Discovery Call',
        })
        cal('inline', { elementOrSelector: '#cal-booking', calLink: calLink })
      } catch (error) {
        console.error('Cal.com embed error:', error)
        // Fallback to direct link on error
        window.open(`https://cal.com/${calLink}`, '_blank')
      }
    } else {
      // Fallback to direct link if embed is not loaded
      window.open(`https://cal.com/${calLink}`, '_blank')
    }
  }

  const buttonSizes = {
    sm: 'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm',
    md: 'px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base',
    lg: 'px-3 py-2 text-sm sm:px-4 sm:py-2.5 lg:px-6 lg:py-4 sm:text-base lg:text-lg',
  }

  const buttonVariants = {
    primary:
      '!bg-black dark:!bg-gray-900 hover:!bg-gray-900 dark:hover:!bg-gray-800 !text-white !opacity-100 shadow-xl hover:shadow-2xl border border-gray-800 dark:border-gray-700 hover:border-gray-700 dark:hover:border-gray-600 transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm',
    secondary:
      '!bg-gray-100 hover:!bg-gray-200 !text-gray-900 dark:!bg-gray-800 dark:hover:!bg-gray-700 dark:!text-gray-100 shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300',
    outline:
      '!border-2 !border-gray-300 dark:!border-gray-600 hover:!border-gray-400 dark:hover:!border-gray-500 !text-gray-700 dark:!text-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:!bg-transparent backdrop-blur-sm',
  }

  return (
    <>
      <Button
        onClick={handleClick}
        className={`${buttonSizes[size]} ${buttonVariants[variant]} font-semibold rounded-xl ${className}`}
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view"}'
      >
        {showIcon && (
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        )}
        <FormattedMessage
          id="buttons.discoveryCall"
          defaultMessage="Book Discovery Call"
        />
      </Button>

      {/* Hidden div for inline embed (if needed) */}
      <div id="cal-booking" className="hidden"></div>
    </>
  )
}
