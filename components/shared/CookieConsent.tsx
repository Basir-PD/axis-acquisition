'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, ExternalLink, Settings, Shield, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CookieConsentProps {
  className?: string
}

interface CookieSettings {
  necessary: boolean
  analytics: boolean
}

const CookieConsent: React.FC<CookieConsentProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true, // Always required
    analytics: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('axisacquisition-cookie-consent')
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (consentSettings: CookieSettings) => {
    const consentData = {
      settings: consentSettings,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }

    localStorage.setItem(
      'axisacquisition-cookie-consent',
      JSON.stringify(consentData),
    )

    // Dispatch custom event for Google Analytics integration
    window.dispatchEvent(
      new CustomEvent('cookieConsentUpdate', {
        detail: consentSettings,
      }),
    )

    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
    }
    saveConsent(allAccepted)
  }

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
    }
    saveConsent(necessaryOnly)
  }

  const handleSaveSettings = () => {
    saveConsent(settings)
  }

  const handleToggleSetting = (key: keyof CookieSettings) => {
    if (key === 'necessary') return // Cannot disable necessary cookies
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
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-[9999]',
          'bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-black/10 dark:border-white/20',
          'shadow-2xl shadow-black/20',
          className,
        )}
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {!showDetails ? (
            // Main Banner
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
              {/* Icon and Title */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-black/20 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-black dark:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white text-lg">
                    Cookie Preferences
                  </h3>
                  <p className="text-sm text-black/80 dark:text-white/80">
                    Quebec Law 25 Compliant
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-black/90 dark:text-white/90 leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze
                  website traffic.
                  <span className="font-medium text-black dark:text-white">
                    {' '}
                    Your privacy matters to us.
                  </span>{' '}
                  You can choose which cookies to accept or reject them all.
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-black dark:text-white hover:underline ml-1 font-medium"
                  >
                    Learn more about our cookies
                  </button>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                  className="text-black dark:text-white border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 backdrop-blur-sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptNecessary}
                  className="text-black dark:text-white border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 backdrop-blur-sm"
                >
                  Necessary Only
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 border-0"
                >
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            // Detailed Settings
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Shield className="w-5 h-5 text-black dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white text-lg">
                      Cookie Settings
                    </h3>
                    <p className="text-sm text-black/70 dark:text-white/70">
                      Choose which cookies you want to allow
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Cookie Categories */}
              <div className="grid gap-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 rounded-lg border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 backdrop-blur-sm">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-black dark:text-white">
                        Necessary Cookies
                      </h4>
                      <span className="px-2 py-1 text-xs bg-black/20 dark:bg-white/20 text-black dark:text-white rounded-md font-medium backdrop-blur-sm">
                        Required
                      </span>
                    </div>
                    <p className="text-sm text-black/80 dark:text-white/80">
                      Essential for the website to function properly. These
                      cookies enable basic features like security, network
                      management, and accessibility.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-6 bg-black dark:bg-white rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white dark:bg-black rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 rounded-lg border border-black/20 dark:border-white/20 backdrop-blur-sm">
                  <div className="flex-1 pr-4">
                    <h4 className="font-medium text-black dark:text-white mb-2">
                      Analytics Cookies
                    </h4>
                    <p className="text-sm text-black/80 dark:text-white/80 mb-2">
                      Help us understand how visitors interact with our website
                      by collecting and reporting information anonymously.
                    </p>
                    <p className="text-xs text-black/70 dark:text-white/70">
                      Services: Google Analytics
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleSetting('analytics')}
                    className="flex items-center"
                  >
                    <div
                      className={cn(
                        'w-10 h-6 rounded-full flex items-center transition-colors',
                        settings.analytics
                          ? 'bg-black dark:bg-white justify-end'
                          : 'bg-black/20 dark:bg-white/20 justify-start',
                      )}
                    >
                      <div className="w-4 h-4 bg-white dark:bg-black rounded-full shadow-sm mx-1 transition-transform"></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap gap-4 text-sm text-black/70 dark:text-white/70">
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
                >
                  Privacy Policy
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
                >
                  Cookie Policy
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-xs text-black/80 dark:text-white/80">
                  In compliance with Quebec Law 25 and PIPEDA
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-black/10 dark:border-white/10">
                <Button
                  variant="outline"
                  onClick={handleAcceptNecessary}
                  className="text-black dark:text-white border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 backdrop-blur-sm"
                >
                  Accept Necessary Only
                </Button>
                <Button
                  onClick={handleSaveSettings}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 border-0"
                >
                  Save My Preferences
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAcceptAll}
                  className="text-black dark:text-white border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 backdrop-blur-sm"
                >
                  Accept All Cookies
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieConsent
