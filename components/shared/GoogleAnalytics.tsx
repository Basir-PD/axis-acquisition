'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { useCookieConsent } from '@/hooks/useCookieConsent'

declare global {
  interface Window {
    gtag: (..._args: any[]) => void
    dataLayer: any[]
  }
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-38TXNJZEB2'

const GoogleAnalytics = () => {
  const { canUseAnalytics, loading } = useCookieConsent()

  // Listen for consent changes to clear cookies immediately
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleConsentChange = () => {
      // If consent was withdrawn, clear cookies immediately
      if (!canUseAnalytics && !loading) {
        clearAnalyticsCookies()
      }
    }

    window.addEventListener('cookieConsentUpdate', handleConsentChange)
    window.addEventListener('cookieConsentCleared', handleConsentChange)

    return () => {
      window.removeEventListener('cookieConsentUpdate', handleConsentChange)
      window.removeEventListener('cookieConsentCleared', handleConsentChange)
    }
  }, [canUseAnalytics, loading])

  const clearAnalyticsCookies = () => {
    if (typeof window === 'undefined') return

    const cookiesToClear = [
      '_ga',
      '_ga_' + GA_TRACKING_ID.replace('G-', ''),
      '_gid',
      '_gat',
    ]
    cookiesToClear.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
  }

  useEffect(() => {
    // Don't load anything while consent is loading
    if (loading) return

    // If analytics is not consented, disable GA
    if (!canUseAnalytics) {
      // Disable existing Google Analytics if it was loaded
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        })
      }

      // Clear any existing GA cookies when consent is denied
      clearAnalyticsCookies()
      return
    }

    // If analytics is consented, enable GA
    if (typeof window !== 'undefined') {
      // Initialize dataLayer if it doesn't exist
      window.dataLayer = window.dataLayer || []

      // Define gtag function
      window.gtag = function (..._args) {
        window.dataLayer.push(_args)
      }

      // Set default consent state
      window.gtag('consent', 'default', {
        analytics_storage: 'granted',
        ad_storage: 'denied', // We don't use ads currently
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500,
      })

      // Initialize GA
      window.gtag('js', new Date())
      window.gtag('config', GA_TRACKING_ID, {
        anonymize_ip: true, // Anonymize IPs for privacy
        allow_google_signals: false, // Disable Google Signals
        allow_ad_personalization_signals: false, // Disable ad personalization
      })
    }
  }, [canUseAnalytics, loading])

  // Don't render if no tracking ID is configured or if analytics is not consented
  if (!GA_TRACKING_ID || loading || !canUseAnalytics) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
    </>
  )
}

export default GoogleAnalytics

// Utility function to track events (only if consent is given)
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  if (typeof window === 'undefined' || !window.gtag) return

  // Check consent before tracking
  const consent = localStorage.getItem('webapplica-cookie-consent')
  if (!consent) return

  try {
    const parsedConsent = JSON.parse(consent)
    if (!parsedConsent.settings?.analytics) return

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

// Utility function to track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return

  // Check consent before tracking
  const consent = localStorage.getItem('webapplica-cookie-consent')
  if (!consent) return

  try {
    const parsedConsent = JSON.parse(consent)
    if (!parsedConsent.settings?.analytics) return

    window.gtag('config', GA_TRACKING_ID, {
      page_path: path,
      page_title: title,
    })
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}
