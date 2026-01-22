'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CookieConsentProps {
  className?: string
}

interface CookieSettings {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const CookieConsent: React.FC<CookieConsentProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('axisacquisition-cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (consentSettings: CookieSettings) => {
    const consentData = {
      settings: consentSettings,
      timestamp: new Date().toISOString(),
      version: '2.0',
      region: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }

    localStorage.setItem(
      'axisacquisition-cookie-consent',
      JSON.stringify(consentData),
    )

    window.dispatchEvent(
      new CustomEvent('cookieConsentUpdate', {
        detail: consentSettings,
      }),
    )

    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    })
  }

  const handleRejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    })
  }

  const handleSaveSettings = () => {
    saveConsent(settings)
  }

  const handleToggle = (key: keyof CookieSettings) => {
    if (key === 'necessary') return
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-[9999]',
          'bg-[#faf9f7] dark:bg-[#141414] border-t border-stone-200 dark:border-stone-800',
          className,
        )}
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <AnimatePresence mode="wait">
            {!showDetails ? (
              <motion.div
                key="banner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col lg:flex-row lg:items-center gap-6"
              >
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    We use cookies to enhance your experience, analyze site
                    traffic, and for marketing purposes. By clicking "Accept
                    All", you consent to our use of cookies.{' '}
                    <button
                      onClick={() => setShowDetails(true)}
                      className="inline-flex items-center gap-1 text-stone-900 dark:text-stone-100 hover:underline underline-offset-2"
                    >
                      Manage preferences
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                  <button
                    onClick={handleRejectAll}
                    className="px-5 py-2.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 text-sm font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 rounded-lg transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-1">
                      Cookie Preferences
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Customize your cookie settings below
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cookie Categories */}
                <div className="space-y-4">
                  {/* Necessary */}
                  <div className="flex items-start justify-between py-4 border-b border-stone-200 dark:border-stone-800">
                    <div className="flex-1 pr-8">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100">
                          Strictly Necessary
                        </h4>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          Always active
                        </span>
                      </div>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Essential for the website to function. These cannot be
                        disabled.
                      </p>
                    </div>
                    <div className="w-11 h-6 bg-stone-900 dark:bg-stone-100 rounded-full flex items-center justify-end px-0.5 cursor-not-allowed">
                      <div className="w-5 h-5 bg-white dark:bg-stone-900 rounded-full shadow-sm" />
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-start justify-between py-4 border-b border-stone-200 dark:border-stone-800">
                    <div className="flex-1 pr-8">
                      <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-1">
                        Analytics & Performance
                      </h4>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Help us understand how visitors interact with our
                        website by collecting anonymous information.
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('analytics')}
                      className={cn(
                        'w-11 h-6 rounded-full flex items-center px-0.5 transition-colors',
                        settings.analytics
                          ? 'bg-stone-900 dark:bg-stone-100 justify-end'
                          : 'bg-stone-300 dark:bg-stone-700 justify-start',
                      )}
                    >
                      <div className="w-5 h-5 bg-white dark:bg-stone-900 rounded-full shadow-sm" />
                    </button>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-start justify-between py-4">
                    <div className="flex-1 pr-8">
                      <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-1">
                        Marketing & Advertising
                      </h4>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Used to deliver personalized advertisements and measure
                        their effectiveness.
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('marketing')}
                      className={cn(
                        'w-11 h-6 rounded-full flex items-center px-0.5 transition-colors',
                        settings.marketing
                          ? 'bg-stone-900 dark:bg-stone-100 justify-end'
                          : 'bg-stone-300 dark:bg-stone-700 justify-start',
                      )}
                    >
                      <div className="w-5 h-5 bg-white dark:bg-stone-900 rounded-full shadow-sm" />
                    </button>
                  </div>
                </div>

                {/* Legal Compliance Notice */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                  <p className="text-xs text-stone-400 dark:text-stone-500 leading-relaxed mb-4">
                    This notice complies with GDPR (EU), CCPA (California),
                    PIPEDA & Quebec Law 25 (Canada), and the Australian Privacy
                    Act. You can withdraw consent at any time. For more
                    information, see our{' '}
                    <a
                      href="/privacy"
                      className="underline underline-offset-2 hover:text-stone-600 dark:hover:text-stone-300"
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="/cookies"
                      className="underline underline-offset-2 hover:text-stone-600 dark:hover:text-stone-300"
                    >
                      Cookie Policy
                    </a>
                    .
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleRejectAll}
                      className="px-5 py-2.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg transition-colors"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className="px-5 py-2.5 text-sm font-medium text-stone-900 dark:text-stone-100 border border-stone-900 dark:border-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      Save Preferences
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-5 py-2.5 text-sm font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 rounded-lg transition-colors"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieConsent
