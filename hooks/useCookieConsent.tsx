'use client'

import { useCallback, useEffect, useState } from 'react'

export interface CookieSettings {
  necessary: boolean
  analytics: boolean
}

export interface ConsentData {
  settings: CookieSettings
  timestamp: string
  version: string
}

const STORAGE_KEY = 'webapplica-cookie-consent'
const CONSENT_VERSION = '1.0'

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentData | null>(null)
  const [loading, setLoading] = useState(true)

  // Load consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: ConsentData = JSON.parse(stored)
        // Check if consent version is current
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed)
        } else {
          // Clear outdated consent
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch (error) {
      console.error('Error loading cookie consent:', error)
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  // Listen for consent updates from the banner
  useEffect(() => {
    const handleConsentUpdate = (event: CustomEvent<CookieSettings>) => {
      const newConsent: ConsentData = {
        settings: event.detail,
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
      }
      setConsent(newConsent)
    }

    window.addEventListener(
      'cookieConsentUpdate',
      handleConsentUpdate as EventListener,
    )
    return () => {
      window.removeEventListener(
        'cookieConsentUpdate',
        handleConsentUpdate as EventListener,
      )
    }
  }, [])

  // Save consent to localStorage
  const saveConsent = useCallback((settings: CookieSettings) => {
    const consentData: ConsentData = {
      settings,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData))
      setConsent(consentData)

      // Dispatch event for other components
      window.dispatchEvent(
        new CustomEvent('cookieConsentUpdate', {
          detail: settings,
        }),
      )
    } catch (error) {
      console.error('Error saving cookie consent:', error)
    }
  }, [])

  // Clear consent (for testing or policy updates)
  const clearConsent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setConsent(null)

      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('cookieConsentCleared'))
    } catch (error) {
      console.error('Error clearing cookie consent:', error)
    }
  }, [])

  // Check if specific category is consented
  const hasConsent = useCallback(
    (category: keyof CookieSettings): boolean => {
      return consent?.settings?.[category] ?? false
    },
    [consent],
  )

  // Check if user has given any consent (has made a choice)
  const hasGivenConsent = useCallback((): boolean => {
    return consent !== null
  }, [consent])

  // Get all current settings
  const getSettings = useCallback((): CookieSettings | null => {
    return consent?.settings ?? null
  }, [consent])

  // Check if consent is expired (optional - could implement expiry logic)
  const isConsentExpired = useCallback((): boolean => {
    if (!consent?.timestamp) return false

    const consentDate = new Date(consent.timestamp)
    const now = new Date()
    const diffInDays =
      (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24)

    // Consent expires after 365 days (as per typical regulations)
    return diffInDays > 365
  }, [consent])

  return {
    consent,
    loading,
    hasConsent,
    hasGivenConsent,
    getSettings,
    isConsentExpired,
    saveConsent,
    clearConsent,
    // Convenience getters
    canUseAnalytics: hasConsent('analytics'),
  }
}
